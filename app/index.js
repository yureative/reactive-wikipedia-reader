import 'babel/polyfill'
import React from 'react'
import createHashHistory from 'history/lib/createHashHistory'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from './containers/App'
import WikiPageList from './components/WikiPageList'
import WikiPage from './components/WikiPage'
import Bookmarks from './components/Bookmarks'
import BookmarkedPage from './components/BookmarkedPage'

const history = createHashHistory()
const store = configureStore()

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={WikiPageList} />
          <Route path="pages" componsent={WikiPageList} />
          <Route path="page/:id" component={WikiPage} />
          <Route path="bookmarks" component={Bookmarks} />
          <Route path="bookmark/:id" component={BookmarkedPage} />
        </Route>
      </Router>
    }
  </Provider>,
  document.body
)
