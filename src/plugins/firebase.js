import firebase from "@firebase/app";
import "@firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyAcYscykd9Nspa4JJD2vreXGrJqpZOhmbg",
  authDomain: "acnh-gachi-complete-furi-j.firebaseapp.com",
  databaseURL: "https://acnh-gachi-complete-furi-j.firebaseio.com",
  projectId: "acnh-gachi-complete-furi-j",
  storageBucket: "acnh-gachi-complete-furi-j.appspot.com",
  messagingSenderId: "194416290134",
  appId: "1:194416290134:web:b6d594946c360fd095cef7"
};

firebase.initializeApp(config);

export default firebase;
