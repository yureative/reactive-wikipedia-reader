import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import { firebase } from '../api/firebase'
import DDButton from 'react-dropdown-button'

export default class Header extends Component {
  static get propTypes() {
    return {
      authData: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    }
  }

  render() {
    const { authData, login, logout } = this.props
    const menuItems = authData.uid ?
        [{ label: 'Logout', onClick: logout }]
      :
        [{ label: 'Login with Google', onClick: login }]

    return (
      <section className="header">
        <div className="user-menu">
          <DDButton items={menuItems}>{authData.displayName}</DDButton>
        </div>
        <h1>Reactive Wikipedia Reader</h1>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bookmarks">Bookmarks</Link></li>
        </ul>
      </section>
    )
  }
}
