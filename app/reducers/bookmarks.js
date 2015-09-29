import {
  ADD_TO_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS
} from '../constants/ActionTypes'

export default function bookmarks(state = [], action) {
  switch (action.type) {
  case ADD_TO_BOOKMARKS:
    return [action.wikiPage, ...state]

  /*
  case REMOVE_FROM_BOOKMARKS:
    return state.filter(page => page.id != action.wikiPageId)
  */

  default:
    return state
  }
}
