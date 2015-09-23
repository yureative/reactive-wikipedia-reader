import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../assets/styles/main.scss'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as WikiPageActions from '../actions/wikiPage'

class App extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired
    }
  }

  render() {
    const { wikiPages, dispatch } = this.props
    const actions = bindActionCreators(WikiPageActions, dispatch)

    return (
      <div>
        <Header />
        <MainSection
          wikiPages={wikiPages}
          refreshWikiPages={actions.refreshWikiPages} />
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
