import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGPSUs7bIwT6sQNQ1TCvZgJXU1jttRiL0",
    authDomain: "react-notes-b8e02.firebaseapp.com",
    projectId: "react-notes-b8e02",
    storageBucket: "react-notes-b8e02.firebasestorage.app",
    appId: "1:347097530616:web:707be8b7f6d8f986c53b0d"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
    auth,
    db,
    usersCollection
}