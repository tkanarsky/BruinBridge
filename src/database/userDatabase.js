import { firestore } from "./firebase.js"

const userDb = firestore.collection("users");

export function userExists(id, callback) {
    userDb
      .doc(id)
      .get()
      .then(doc => {
        callback(doc.exists);
      });
  }
  
  export function createUser(user, mentorStatus) {
    if (!user) return;
    userDb.doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      major: "",
      year: "",
      bio: "",
      karma: 0,
      is_mentor: mentorStatus,
      partner: null,
      interest1: null,
      interest2: null,
      interest3: null
    });
    return true;
  }
  
  export function getUser(id, callback) {
    userDb
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          callback(doc.data());
        } else {
          callback(null);
        }
      });
  }
  
  export function updateUser(id, data) {
    userDb.doc(id).update(data);
  }
  
  export function deleteUser(id) {
    userDb.child(id).delete();
  }
  