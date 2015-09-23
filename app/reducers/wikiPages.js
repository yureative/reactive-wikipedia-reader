import { REFRESH_WIKI_PAGES } from '../constants/ActionTypes'

export default function wikiPages(state = [], action) {
  switch (action.type) {
  case REFRESH_WIKI_PAGES:
    return action.wikiPages
  default:
    return state
  }
}
