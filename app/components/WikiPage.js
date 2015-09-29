import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { updateWikiPageDetail } from '../actions/wikiPage'
import { addToBookmarks } from '../actions/bookmarks'

class WikiPage extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired
    }
  }

  componentWillMount() {
    this.props.dispatch(updateWikiPageDetail(this.props.params.id))
  }

  render() {
    const { wikiPages, dispatch, params } = this.props
    const page = wikiPages.find(x => x.id == params.id)

    return (
      <div className="wiki-page">
        {page ?
          <div className="wiki-page-detail">
            <div className="wiki-page-detail-header">
              <h2>{page.title}</h2>
              {page.originalUrl ?
                <div className="wiki-page-original-link">
                  [
                    <a target="_blank" href={page.originalUrl}>
                      Read on Wikipedia
                      <img className="icon" src={require('../assets/images/icon/link-external.svg')} />
                    </a>
                  ]
                </div>
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
          <div className="wiki-page-detail">ERROR: Cannot find the wiki page</div>
        }
        <div className="back-previous-page">
          <Link to="/">
            <img className="icon" src={require('../assets/images/icon/arrow-left-01.svg')} />
            BACK
          </Link>
        </div>
        {page ?
          <div className="bookmark-page">
            {page.bookmarked ?
              <div className="wiki-page-bookmarked">
                <img className="icon" src={require('../assets/images/icon/done-01.svg')} />
                Bookmarked
              </div>
            :
              <a onClick={() => dispatch(addToBookmarks(page))}>
                <img className="icon" src={require('../assets/images/icon/star-circle.svg')} />
                Bookmark
              </a>
            }
          </div>
        : ''}
      </div>
    )
  }
}

export default connect(state => ({
  wikiPages: state.wikiPages
}))(WikiPage)
