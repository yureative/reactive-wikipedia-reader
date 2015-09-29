import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}

export default connect(state => ({
  bookmarks: state.bookmarks
}))(Bookmarks)
