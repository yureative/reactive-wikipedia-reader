import { combineReducers } from 'redux'
import authData from './authData'
import wikiPages from './wikiPages'
import bookmarks from './bookmarks'

const rootReducer = combineReducers({
  authData,
  wikiPages,
  bookmarks
})

export default rootReducer
