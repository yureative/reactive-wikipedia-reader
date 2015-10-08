import {
  ADD_TO_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS,
  UPDATE_BOOKMARKS,
  CLEAR_AUTH_DATA
} from '../constants/ActionTypes'

const initialState = []

export default function bookmarks(state = initialState, action) {
  switch (action.type) {
  case ADD_TO_BOOKMARKS:
    return [action.wikiPage, ...state]

  case REMOVE_FROM_BOOKMARKS:
    return state.filter(page => page.id != action.id)

  case UPDATE_BOOKMARKS:
    return action.bookmarks

  case CLEAR_AUTH_DATA:
    return initialState

  default:
    return state
  }
}
