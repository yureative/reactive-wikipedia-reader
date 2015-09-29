import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { removeFromBookmarks } from '../actions/bookmarks'

class Bookmarks extends Component {
  static get propTypes() {
    return {
      bookmarks: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired
    }
  }

  render() {
    const { bookmarks, dispatch } = this.props

    return (
      <div>
        <h2>Bookmarks</h2>
        {bookmarks.length == 0 ?
          <p>No bookmarks.</p>
        :
          <ul className="wiki-page-list">
            {bookmarks.map(page =>
              <li key={page.id}>
                <Link to={`/bookmark/${page.id}`}>
                  <img className="icon" src={require('../assets/images/icon/arrow-right-01.svg')} />
                  {page.title}
                </Link>
                <div className="action-button">
                  <img className="icon delete"
                       onClick={this.onDeleteBookmark.bind(this, page.id)}
                       src={require('../assets/images/icon/remove-01.svg')} />
                </div>
              </li>
            )}
          </ul>
        }
      </div>
    )
  }

  onDeleteBookmark(pageId) {
    this.props.dispatch(removeFromBookmarks(pageId))
  }
}

export default connect(state => ({
  bookmarks: state.bookmarks
}))(Bookmarks)
