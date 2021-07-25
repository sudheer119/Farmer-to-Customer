import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD6OLBM2xIxOYKjdszkpyd_e7uqq7sXTCU",
  authDomain: "final-aa239.firebaseapp.com",
  projectId: "final-aa239",
  storageBucket: "final-aa239.appspot.com",
  messagingSenderId: "28841036973",
  appId: "1:28841036973:web:528633b78dfedd0e714a24"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;