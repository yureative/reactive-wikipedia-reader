import { compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import rootReducer from '../reducers/index'
import { refreshWikiPages } from '../actions/wikiPage'

const createPersistentStore = compose(
  persistState()
)(createStore)

export default function configureStore() {
  let store = createPersistentStore(rootReducer)

  // For first user access
  if (store.getState().wikiPages.length == 0) {
    store.dispatch(refreshWikiPages())
  }

  return store
}
