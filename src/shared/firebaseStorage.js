import firebase from 'firebase/app';
import 'firebase/storage';
import { getApiKey } from './utilities';

firebase.initializeApp({
  apiKey: getApiKey('firebase'),
  storageBucket: 'gs://job-search-compa-1514144240150.appspot.com'
});

const firebaseStorageRef = firebase.storage().ref();

export default firebaseStorageRef;
