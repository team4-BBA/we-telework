import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBDVRV9htCYA3Unp9QGB0FYAz7fSH1InoY',
  authDomain: 'we-telework.firebaseapp.com',
  databaseURL: 'https://we-telework.firebaseio.com',
  projectId: 'we-telework',
  storageBucket: 'we-telework.appspot.com',
  messagingSenderId: '825733838028',
  appId: '1:825733838028:web:8d3cf3cc581a5b9c16be69',
  measurementId: 'G-PEKDNHZYHY'
}

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = 'ja'
export const provider = new firebase.auth.TwitterAuthProvider()

export default firebase
