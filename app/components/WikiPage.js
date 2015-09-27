import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { updateWikiPageDetail } from '../actions/wikiPage'

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
    const wikiPageDetail =
      page ?
        <div className="wiki-page-detail">
          <h2>{page.title}</h2>
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

    return (
      <div className="wiki-page">
        {wikiPageDetail}
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
