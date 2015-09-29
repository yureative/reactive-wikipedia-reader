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

export function fetchWikipediaPageDetail(pageId) {
  let client = wikipediaClient()
  let params = {
    action: 'query',
    pageids: pageId,
    prop: 'info|categories|images',
    inprop: 'url',
    format: 'json'
  }

  return client.query(params).end().then(res => {
    if (!(res.body.query && res.body.query.pages[pageId])) {
      console.error(res)
      throw new Error('Could not find query results from Wikipedia API')
    }

    let page = res.body.query.pages[pageId]
    return {
      id: pageId,
      title: page.title,
      originalUrl: page.fullurl,
      images: page.images ? page.images.map(img =>
        ({ title: img.title })
      ) : [],
      categories: page.categories ? page.categories.map(cat =>
        cat.title.replace(/^Category:/, '')
      ) : []
    }
  })
}

export function fetchWikipediaImagesWithUrl(imageTitles) {
  let client = wikipediaClient()
  let params = {
    action: 'query',
    titles: imageTitles.join('|'),
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json'
  }

  return client.query(params).end().then(res => {
    if (!(res.body.query && res.body.query.pages)) {
      console.error(res)
      throw new Error('Could not find query results from Wikipedia API')
    }

    let pages = res.body.query.pages
    return Object.keys(pages).map(key =>
      ({ title: pages[key].title, url: pages[key].imageinfo[0].url })
    )
  })
}

function wikipediaClient() {
  let agent = superagentPromise(superagent, Promise)
  return agent.get('https://en.wikipedia.org/w/api.php').jsonp()
}
