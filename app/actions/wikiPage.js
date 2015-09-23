import { REFRESH_WIKI_PAGES } from '../constants/ActionTypes'
import { DEFAULT_NUM_OF_WIKI_PAGES } from '../constants/wikiPage'
import { fetchRandomWikipediaPages } from '../api/wikipedia'

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
