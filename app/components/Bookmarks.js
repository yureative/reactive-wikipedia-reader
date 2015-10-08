import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  removeFromBookmarks,
  searchBookmarks,
  syncBookmarks
} from '../actions/bookmarks'
import firebase from '../api/firebase'

class Bookmarks extends Component {
  static get propTypes() {
    return {
      bookmarks: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired
    }
  }

  componentWillMount() {
    this.state = { searchWord: '' }
    const { bookmarks, dispatch } = this.props

    firebase().baseRef.onAuth(authData => {
      if (authData) {
        dispatch(syncBookmarks(authData.uid, bookmarks))
      }
    })
  }

  filterBookmarks(bookmarks) {
    const { searchWord } = this.state
    if (searchWord.length > 0) {
      return bookmarks.filter(x =>
        x.title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      )
    } else {
      return bookmarks
    }
  }

  render() {
    const { bookmarks, dispatch } = this.props
    const { filter } = this.state
    const filteredBookmarks = this.filterBookmarks(bookmarks)

    return (
      <div>
        {bookmarks.length == 0 ?
          <div>
            <h2>Bookmarks</h2>
            <p>No bookmarks.</p>
          </div>
        :
          <div>
            <div className="bookmark-header">
              <h2>Bookmarks</h2>
              <div className="bookmark-search">
                <input className="bookmark-search-form"
                       type="text"
                       placeholder="Search..."
                       onChange={this.onSearchBookmarks.bind(this)} />
              </div>
            </div>
            <ul className="wiki-page-list">
              {filteredBookmarks.map(page =>
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
          </div>
        }
      </div>
    )
  }

  onDeleteBookmark(pageId) {
    this.props.dispatch(removeFromBookmarks(pageId))
  }

  onSearchBookmarks(event) {
    this.setState({ searchWord: event.target.value })
  }
}

export default connect(state => ({
  bookmarks: state.bookmarks
}))(Bookmarks)
