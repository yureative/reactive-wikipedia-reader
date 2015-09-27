import {
  REFRESH_WIKI_PAGES,
  UPDATE_WIKI_PAGE_DETAIL_STARTED,
  UPDATE_WIKI_PAGE_DETAIL_COMPLETED
} from '../constants/ActionTypes'
import { DEFAULT_NUM_OF_WIKI_PAGES } from '../constants/wikiPage'
import { fetchRandomWikipediaPages, fetchWikipediaPageDetail } from '../api/wikipedia'

export function refreshWikiPages(numOfPages = DEFAULT_NUM_OF_WIKI_PAGES) {
  return (dispatch) => {
    fetchRandomWikipediaPages(numOfPages).then(wikiPages => {
      dispatch({ type: REFRESH_WIKI_PAGES, wikiPages })
    }).catch(e => {
      console.error(e)
      throw new Error('Failed to fetch Wikipedia pages')
    })
  }
}

export function updateWikiPageDetail(pageId) {
  return (dispatch) => {
    dispatch({ type: UPDATE_WIKI_PAGE_DETAIL_STARTED, pageId })

    fetchWikipediaPageDetail(pageId).then(wikiPage => {
      dispatch({ type: UPDATE_WIKI_PAGE_DETAIL_COMPLETED, wikiPage })
    }).catch(e => {
      console.error(e)
      throw new Error('Failed to fetch Wikipedia page')
    })
  }
}
