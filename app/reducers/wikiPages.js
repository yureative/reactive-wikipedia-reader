import {
  REFRESH_WIKI_PAGES,
  UPDATE_WIKI_PAGE_DETAIL_STARTED,
  UPDATE_WIKI_PAGE_DETAIL_COMPLETED
} from '../constants/ActionTypes'

export default function wikiPages(state = [], action) {
  switch (action.type) {
  case REFRESH_WIKI_PAGES:
    return action.wikiPages

  case UPDATE_WIKI_PAGE_DETAIL_STARTED:
    return state.map(page =>
      page.id == action.pageId ?
        Object.assign(page, { categories: ['Loading...'] }) :
        page
    )

  case UPDATE_WIKI_PAGE_DETAIL_COMPLETED:
    return state.map(page =>
      page.id == action.wikiPage.id ?
        Object.assign(page, action.wikiPage, { detailed: true }) :
        page
    )
  default:
    return state
  }
}
