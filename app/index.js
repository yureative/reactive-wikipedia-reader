import React from 'react'
import { Provider } from 'react-redux'
import App from './containers/App'
import './assets/styles/main.scss'

React.render(
  <Provider>
    {() => <App />}
  </Provider>,
  document.getElementsByTagName('body')[0]
)
