import {
  ADD_TO_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS
} from '../constants/ActionTypes'

export function addToBookmarks(wikiPage) {
  return { type: ADD_TO_BOOKMARKS, wikiPage }
}

/*
export function removeFromBookmarks(wikiPageId) {
  return { type: REMOVE_FROM_BOOKMARKS, id: wikiPageId }
}
*/
