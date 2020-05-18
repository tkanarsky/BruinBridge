import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB2cnCpZWagynnKj1Ib_jypUVBNaPwRRQc",
  authDomain: "bruin-bridge.firebaseapp.com",
  databaseURL: "https://bruin-bridge.firebaseio.com",
  projectId: "bruin-bridge",
  storageBucket: "bruin-bridge.appspot.com",
  messagingSenderId: "497811451584",
  appId: "1:497811451584:web:83a5bb7e39b2293780c725",
  measurementId: "G-BCR7Z77V6T"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
