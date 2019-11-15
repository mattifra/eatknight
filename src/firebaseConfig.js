import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: "AIzaSyCIDWd0XS6DIApHlg3Ia6_ZyM_on1XX2h4",
  authDomain: "coma-key.firebaseapp.com",
  databaseURL: "https://coma-key.firebaseio.com",
  projectId: "coma-key",
  storageBucket: "coma-key.appspot.com",
  messagingSenderId: "884953537730",
  appId: "1:884953537730:web:8e6e34ad0f75d6b814af5b",
  measurementId: "G-S0LGL7S5J0"
}
firebase.initializeApp(config)
firebase.analytics();

const db = firebase.database();

export {db}