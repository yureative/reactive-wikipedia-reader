import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

export default class WikiPage extends Component {
  static get propTypes() {
    return {
      params: PropTypes.func.requierd
    }
  }

  render() {
    return (
      <section className="main">
        <h2>{this.props.params.id}</h2>
      </section>
    )
  }
}
