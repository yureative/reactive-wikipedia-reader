import React from 'react'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import App from './containers/App'

const store = configureStore()

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementsByTagName('body')[0]
)
