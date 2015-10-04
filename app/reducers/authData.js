import {
  UPDATE_AUTH_DATA,
  CLEAR_AUTH_DATA
} from '../constants/ActionTypes'

const initialState = {
  uid: null,
  displayName: 'Anonymous'
}

export default function authData(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTH_DATA:
      return action.authData

    case CLEAR_AUTH_DATA:
      return initialState

    default:
      return state
  }
}
