import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
require('superagent-jsonp')(superagent)

export function fetchRandomWikipediaPages(numOfPages) {
  let client = wikipediaClient()
  let params = {
    action: 'query',
    list: 'random',
    rnlimit: numOfPages,
    rnnamespace: 0,
    format: 'json'
  }

  return client.query(params).end().then(res => {
    if (!(res.body.query && res.body.query.random)) {
      console.error(res)
      throw new Error('Could not find query results from Wikipedia API')
    }

    return res.body.query.random.map(page => {
      return {id: page.id, title: page.title}
    })
  })
}

function wikipediaClient() {
  let agent = superagentPromise(superagent, Promise)
  return agent.get('https://en.wikipedia.org/w/api.php').jsonp()
}
