import { combineReducers } from 'redux'
import wikiPages from './wikiPages'
import bookmarks from './bookmarks'

const rootReducer = combineReducers({
  wikiPages,
  bookmarks
})

export default rootReducer
