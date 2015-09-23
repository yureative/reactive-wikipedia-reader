import { compose, createStore, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index'
import { refreshWikiPages } from '../actions/wikiPage'

const loggerMiddleware = createLogger()
const createPersistentStore = compose(
  persistState()
)(createStore)
const createPersistentStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,  // lets us dispatvch() functions
  loggerMiddleware  // neat middleware logs actions
)(createPersistentStore)

export default function configureStore() {
  let store = createPersistentStoreWithMiddleware(rootReducer)

  // For first user access
  if (store.getState().wikiPages.length == 0) {
    store.dispatch(refreshWikiPages())
  }
  return store
}
