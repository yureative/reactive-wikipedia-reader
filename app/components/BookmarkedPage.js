import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { updateBookmarkedPageDetail } from '../actions/bookmarks'

class BookmarkedPage extends Component {
  static get propTypes() {
    return {
      bookmarks: PropTypes.array.isRequired,
      params: PropTypes.object.isRequired
    }
  }

  render() {
    const { bookmarks, params } = this.props
    const page = bookmarks.find(x => x.id == params.id)

    return (
      <div className="wiki-page">
        {page ?
          <div className="wiki-page-detail">
            <div className="wiki-page-detail-header">
              <h2>{page.title}</h2>
              {page.originalUrl ?
                <p className="wiki-page-original-link">
                  [
                    <a target="_blank" href={page.originalUrl}>
                      Read on Wikipedia
                      <img className="icon" src={require('../assets/images/icon/link-external.svg')} />
                    </a>
                  ]
                </p>
              : ''}
            </div>
            {page.images ?
              <div className="wiki-page-image">
                <ul>
                  {page.images.map(img =>
                    <li key={img.title}><img src={img.url} /></li>
                  )}
                </ul>
              </div>
            : ''}
            <div className="wiki-page-category">
              <h3>Categories</h3>
              <ul>
                {page.categories ? page.categories.map(category =>
                  <li key={category}>{category}</li>
                ) : ''}
              </ul>
            </div>
          </div>
        :
          <p class="error">ERROR: Cannot find the wiki page</p>
        }
        <div className="back-previous-page">
          <Link to="/bookmarks">
            <img className="icon" src={require('../assets/images/icon/arrow-left-01.svg')} />
            BACK
          </Link>
        </div>
        {page ?
          <div className="bookmark-page">
            <div className="wiki-page-bookmarked">
              <img className="icon" src={require('../assets/images/icon/done-01.svg')} />
              Bookmarked
            </div>
          </div>
        : ''}
      </div>
    )
  }
}

export default connect(state => ({
  bookmarks: state.bookmarks
}))(BookmarkedPage)
