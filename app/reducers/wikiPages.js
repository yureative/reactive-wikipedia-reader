import {
  REFRESH_WIKI_PAGES,
  UPDATE_WIKI_PAGE_DETAIL_STARTED,
  UPDATE_WIKI_PAGE_DETAIL_COMPLETED,
  ADD_TO_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS
} from '../constants/ActionTypes'

export default function wikiPages(state = [], action) {
  switch (action.type) {
  case REFRESH_WIKI_PAGES:
    return action.wikiPages

  case UPDATE_WIKI_PAGE_DETAIL_STARTED:
    return state.map(page =>
      (page.id == action.pageId && !page.categories) ?
        Object.assign(page, { categories: ['Loading...'] }) :
        page
    )

  case UPDATE_WIKI_PAGE_DETAIL_COMPLETED:
    return state.map(page =>
      page.id == action.wikiPage.id ?
        Object.assign(page, action.wikiPage, { detailed: true }) :
        page
    )

  case ADD_TO_BOOKMARKS:
    return state.map(page =>
      page.id == action.wikiPage.id ?
        Object.assign(page, { bookmarked: true }) :
        page
    )

  case REMOVE_FROM_BOOKMARKS:
    return state.map(page =>
      page.id == action.id ?
        Object.assign(page, { bookmarked: false }) :
        page
    )

  default:
    return state
  }
}
