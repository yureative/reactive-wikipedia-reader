import {
  ADD_TO_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS,
  UPDATE_BOOKMARKS
} from '../constants/ActionTypes'
import Firebase from 'firebase'
import firebase from '../api/firebase'

export function addToBookmarks(wikiPage) {
  onlyLoginUser(uid =>
    firebase().getBookmark(uid, wikiPage.id).set(wikiPage)
  )
  return { type: ADD_TO_BOOKMARKS, wikiPage }
}

export function removeFromBookmarks(wikiPageId) {
  onlyLoginUser(uid =>
    firebase().getBookmark(uid, wikiPageId).set(null)
  )
  return { type: REMOVE_FROM_BOOKMARKS, id: wikiPageId }
}

export function syncBookmarks(uid, localBookmarks) {
  return dispatch => {
    const userRef = firebase().getUser(uid)

    userRef.child('bookmarksSyncedAt').once('value', syncedAt => {
      if (syncedAt.val()) {
        userRef.child('bookmarks').once('value', data => {
          const firebaseBookmarks = data.val()
          const newBookmarks = firebaseBookmarks ?
            Object.keys(firebaseBookmarks).map(x => firebaseBookmarks[x])
          :
            []
          dispatch({ type: UPDATE_BOOKMARKS, bookmarks: newBookmarks })
        })
      } else {
        // first syncing
        const bookmarksRef = userRef.child('bookmarks')
        localBookmarks.forEach(x => bookmarksRef.child(x.id).set(x))
      }

      userRef.child('bookmarksSyncedAt').set(
        Firebase.ServerValue.TIMESTAMP
      )
    })
  }
}

function onlyLoginUser(callback) {
  const authData = firebase().baseRef.getAuth()
  if (authData) {
    callback(authData.uid)
  }
}
