import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzPuwpdvHvGqWDpgkFdCPWz0P7PL-qnm8",
  authDomain: "task-app-2ceb2.firebaseapp.com",
  databaseURL: "https://task-app-2ceb2.firebaseio.com",
  projectId: "task-app-2ceb2",
  storageBucket: "task-app-2ceb2.appspot.com",
  messagingSenderId: "1026331792543",
  appId: "1:1026331792543:web:da5380c7d79df2c3cffeaa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
