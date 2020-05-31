import { firestore } from "./firebase.js";

const userDb = firestore.collection("users");
const mentorDb = firestore.collection("mentors");

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
  if (mentorStatus) {
    mentorDb.doc(user.uid).set({});
  }
  return true;
}

export function getMentors(callback) {
  mentorDb.get().then(snapshot => {
    let availableMentors = [];
    snapshot.forEach(mentor => {
      availableMentors.push(mentor.id);
    });
    callback(availableMentors);
  });
}

export function matchMentor(mentorID, menteeID) {
  updateUser(mentorID, { partner: menteeID });
  updateUser(menteeID, { partner: mentorID });
  mentorDb.doc(mentorID).delete();
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

export function matching(id) {
  class match{
    constructor(id, score){
      this.id = id;
      this.score = id;
    }
  }
  getUser(id, userDb => {
    const school = userDb.school;
    const major = userDb.major;
    let m = match(0, 0);

    getMentors(availableMentors => {
      for (const mentor in availableMentors){
        let curr = match(mentor, 0)
  
        getUser(mentor, userDb => {
          if (school === userDb.school){
            curr.this.score += 4;
          }
          if (major === userDb.major){
            curr.this.score += 3;
          }
        });
  
        if (curr.this.score >= m.this.score){
          m = curr;
         }
      }
      matchMentor(m.this.id, id);
    });
  });
}