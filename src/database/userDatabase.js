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
      school: "",
      year: "",
      bio: "",
      karma: 0,
      is_mentor: mentorStatus,
      mentorid: null,
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
  
  export function match(id) {
    class match{
      constructor(id, score){
        this.id = id;
        this.score = id;
      }
    }

    let m = match(0, 0);

    //for mentor in available mentors
      let curr = match(0, 0)
      curr.this.score += 4;

      curr.this.score += 3;

      curr.this.score += 1;
      if (curr.this.score >= m.this.score){
       m = curr;
      }

    updateUser(this.props.id, { mentorid: m.this.id });

  }