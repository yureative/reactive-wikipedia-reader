import 'babel/polyfill'
import React from 'react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import App from './containers/App'
import WikiPageList from './components/WikiPageList'
import WikiPage from './components/WikiPage'

const history = createBrowserHistory()
const store = configureStore()

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={WikiPageList} />
          <Route path="pages" componsent={WikiPageList} />
          <Route path="page/:id" component={WikiPage} />
        </Route>
      </Router>
    }
  </Provider>,
  document.body
)
