import firebase from 'firebase/app';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  storageBucket: 'gs://job-search-compa-1514144240150.appspot.com'
});

const firebaseStorageRef = firebase.storage().ref();

export default firebaseStorageRef;
