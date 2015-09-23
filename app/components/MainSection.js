import React, { Component, PropTypes } from 'react';

export default class MainSection extends Component {
  static get propTypes() {
    return {
      wikiPages: PropTypes.array.isRequired,
      refreshWikiPages: PropTypes.func.isRequired
    }
  }

  render() {
    return (
      <section className="main">
        <ul className="wiki-page-list">
          {this.props.wikiPages.map(page =>
            <li key={page.id}>{page.title}</li>
          )}
        </ul>
        <div>
          <button onClick={() => this.props.refreshWikiPages()}>fetch new pages</button>
        </div>
      </section>
    )
  }
}
