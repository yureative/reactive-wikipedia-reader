import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { refreshWikiPages, updateWikiPageDetail } from '../actions/wikiPage'

class WikiPageList extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired
    }
  }

  render() {
    const { wikiPages, dispatch } = this.props

    return (
      <div>
        <h2>Home</h2>
        <ul className="wiki-page-list">
          {wikiPages.map(page =>
            <li key={page.id}>
              <Link to={`/page/${page.id}`}>
                <img className="icon" src={require('../assets/images/icon/arrow-right-01.svg')} />
                {page.title}
              </Link>
            </li>
          )}
        </ul>
        <div className="refresh-wiki-page">
          <button onClick={() => dispatch(refreshWikiPages())}>fetch new pages</button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wikiPages: state.wikiPages
}))(WikiPageList)
