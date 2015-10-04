import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import { firebase } from '../api/firebase'
import DDButton from 'react-dropdown-button'

export default class Header extends Component {
  componentWillMount() {
    firebase().onAuth(authData =>
      this.setState({authData})
    )
  }

  render() {
    const { authData } = this.state
    const menuItems = authData ?
        [{ label: 'Logout', onClick: this.onLogout.bind(this) }]
      :
        [{ label: 'Login with Google', onClick: this.onLogin.bind(this) }]

    return (
      <section className="header">
        <div className="user-menu">
          <DDButton items={menuItems}>
            {authData ? authData.google.displayName : 'Anonymous' }
          </DDButton>
        </div>
        <h1>Reactive Wikipedia Reader</h1>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bookmarks">Bookmarks</Link></li>
        </ul>
      </section>
    )
  }

  onLogin() {
    firebase().authWithOAuthPopup('google', (error, authData) =>
      error ?
        console.log('Login Failed!', error)
      :
        console.log('Authenticated successfully with payload: ', authData)
    )
  }

  onLogout() {
    firebase().unauth()
  }
}
