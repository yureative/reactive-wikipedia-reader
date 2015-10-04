import Firebase from 'firebase'

const FIREBASE_ENDPOINT = 'https://reactive-wikipedia-reader.firebaseio.com'

export function firebase() {
  return new Firebase(FIREBASE_ENDPOINT)
}
