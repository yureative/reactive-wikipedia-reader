import { REFRESH_WIKI_PAGES } from '../constants/ActionTypes'
import { DEFAULT_NUM_OF_WIKI_PAGES } from '../constants/wikiPage'
import { fetchRandomWikipediaPages } from '../api/wikimedia'

export function refreshWikiPages(numOfPages = DEFAULT_NUM_OF_WIKI_PAGES) {
  let wikiPages = fetchRandomWikipediaPages(numOfPages)
  return { type: REFRESH_WIKI_PAGES, wikiPages }
}
