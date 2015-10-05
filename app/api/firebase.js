import Firebase from 'firebase'

const FIREBASE_ENDPOINT = 'https://reactive-wikipedia-reader.firebaseio.com'

export default function firebase() {
  return new FirebaseRef()
}

class FirebaseRef {
  constructor() {
    this.baseRef = new Firebase(FIREBASE_ENDPOINT)
  }

  getUser(uid) {
    return this.baseRef.child('users').child(uid)
  }

  getBookmarks(uid) {
    return this.getUser(uid).child('bookmarks')
  }

  getBookmark(uid, wikiPageId) {
    return this.getBookmarks(uid).child(wikiPageId)
  }
}
