import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../assets/styles/main.scss'
import Header from '../components/Header'
import WikiPageList from '../components/WikiPageList'
import * as AuthActions from '../actions/auth'

class App extends Component {
  static get propTypes() {
    return {
      authData: PropTypes.object.isRequired,
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      children: PropTypes.node
    }
  }

  render() {
    const { authData, wikiPages, dispatch } = this.props
    const authActions = bindActionCreators(AuthActions, dispatch)

    return (
      <div>
        <Header authData={authData} {...authActions} />
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
    authData: state.authData,
    wikiPages: state.wikiPages
  }
}

export default connect(mapStateToProps)(App)
