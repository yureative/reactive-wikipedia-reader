import {
  UPDATE_AUTH_DATA,
  CLEAR_AUTH_DATA
} from '../constants/ActionTypes'
import { firebase } from '../api/firebase'

export function login() {
  return dispatch =>
    firebase().authWithOAuthPopup('google', (error, authData) => {
      if (error) {
        console.log('Login Failed!', error)
      } else {
        console.log('Authenticated successfully with payload: ', authData)
        const { uid } = authData
        const { displayName } = authData.google
        dispatch({ type: UPDATE_AUTH_DATA, authData: { uid, displayName } })
      }
    })
}

export function logout() {
  firebase().unauth()
  return { type: CLEAR_AUTH_DATA }
}
