import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV_I00jo6eoGeq81UZ1WoHSgXovyaaJtw",
    authDomain: "myapp-d9482.firebaseapp.com",
    databaseURL: "https://myapp-d9482-default-rtdb.firebaseio.com",
    projectId: "myapp-d9482",
    storageBucket: "myapp-d9482.appspot.com",
    messagingSenderId: "286170574856",
    appId: "1:286170574856:web:15b57a12d0e99c242c61bd",
    measurementId: "G-7F63HQ918E"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = (firebase).firestore();
