import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD0htdgY5KwyV4MK7CqaZXQMhNyP5jiBmU",
  authDomain: "overstock-clone.firebaseapp.com",
  databaseURL: "https://overstock-clone.firebaseio.com",
  projectId: "overstock-clone",
  storageBucket: "overstock-clone.appspot.com",
  messagingSenderId: "505501224291",
  appId: "1:505501224291:web:608b07a9748fe1f669d756",
  measurementId: "G-0DQKM9QDJC",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export const auth = firebase.auth();



