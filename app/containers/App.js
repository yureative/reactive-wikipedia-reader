import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../assets/styles/main.scss'
import Header from '../components/Header'
import WikiPageList from '../components/WikiPageList'
import * as WikiPageActions from '../actions/wikiPage'

class App extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      children: PropTypes.node
    }
  }

  render() {
    const { wikiPages, dispatch } = this.props
    const actions = bindActionCreators(WikiPageActions, dispatch)

    return (
      <div>
        <Header />
        <section className="main">
          {this.props.children}
        </section>
        <section className="footer">
          <hr/>
          <a className="copyright" href="https://github.com/urelx/reactive-wikipedia-reader">Created by Y.Yamanaka</a>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    wikiPages: state.wikiPages
  }
}

export default connect(mapStateToProps)(App)
