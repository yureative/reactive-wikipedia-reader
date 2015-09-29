import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'

export default class Header extends Component {
  render() {
    return (
      <section className="header">
        <h1>Reactive Wikipedia Reader</h1>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bookmarks">Bookmarks</Link></li>
        </ul>
      </section>
    )
  }
}
