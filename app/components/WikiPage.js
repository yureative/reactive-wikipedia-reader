import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class WikiPage extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired
    }
  }

  render() {
    const { wikiPages, dispatch, params } = this.props

    return (
      <div className="wiki-page">
        <h2>{wikiPages.find(x => x.id == params.id).title}</h2>
        <div className="back-previous-page">
          <Link to="/">
            <img className="icon" src={require('../assets/images/icon/arrow-left-01.svg')} />
            BACK
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wikiPages: state.wikiPages
}))(WikiPage)
