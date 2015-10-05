import {
  UPDATE_AUTH_DATA,
  CLEAR_AUTH_DATA
} from '../constants/ActionTypes'
import Firebase from 'firebase'
import firebase from '../api/firebase'

export function login() {
  return dispatch =>
    firebase().baseRef.authWithOAuthPopup('google', (error, authData) => {
      if (error) {
        console.log('Login Failed!', error)
      } else {
        console.log('Authenticated successfully with payload: ', authData)
        updateRemoteAuthData(authData)

        const { uid } = authData
        const { displayName } = authData.google
        dispatch({ type: UPDATE_AUTH_DATA, authData: { uid, displayName } })
      }
    })
}

function updateRemoteAuthData(authData) {
  const userRef = firebase().getUser(authData.uid)

  userRef.child('displayName').set(authData.google.displayName)
  userRef.child('updatedAt').set(Firebase.ServerValue.TIMESTAMP)
  userRef.child('createdAt').transaction(current =>
    current === null ? Firebase.ServerValue.TIMESTAMP : current
  )
}

export function logout() {
  firebase().baseRef.unauth()
  return { type: CLEAR_AUTH_DATA }
}
