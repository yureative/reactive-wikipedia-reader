export function fetchRandomWikipediaPages(numOfPages) {
  // TODO: fetch pages via MediaWiki API
  // https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnlimit=10&rnnamespace=0
  let arr = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'garply', 'waldo', 'fred', 'plugh']
  let pages = Object.keys(arr).map(k => { return {id: k, title: arr[k]} })
  return shuffle(pages).slice(0, numOfPages)
}

function shuffle(a) {
  for (var i=a.length-1;i>=0;i--) {
    var r=Math.floor(i*Math.random());
    var tmp=a[i];
    a[i]=a[r];
    a[r]=tmp;
  }
  return a;
}
