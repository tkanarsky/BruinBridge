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

const userRef = database.ref("users/");

export function userExists(id, callback) {
  userRef.once("value").then((snapshot) => {
    callback(snapshot.hasChild(id));
  });
}

export function createUser(id, name, email) {
  if (!id || !name || !email) return;
  userRef.child(id).set(
    {
      name: name,
      email: email,
      major: "",
      year: "",
      bio: "",
      karma: 0
    }
  );
}

export function getUser(id, callback) {
  userRef.once("value").then((snapshot) => {
    if (snapshot.hasChild(id)) {
      callback(snapshot.child(id).toJSON());
    } else {
      callback(null);
    }
  });
}

export function updateUser(id, data) {
  userRef.child(id).update(data);
  console.log("Updated user!")
}

export function deleteUser(id) {
  userRef.child(id).remove();
}

