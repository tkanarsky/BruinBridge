import { firestore } from "./firebase.js";

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
    school: "",
    karma: 0,
    is_mentor: mentorStatus,
    is_available_mentor: mentorStatus,
    partner: null,
    interest1: null,
    interest2: null,
    interest3: null
  });
  return true;
}

export function getMentors(callback) {
  userDb
  .where("is_mentor", "==", true)
  .where("is_available_mentor", "==", true)
  .get().then(snapshot => {
    let availableMentors = [];
    snapshot.forEach(mentor => {
      let mentorData = mentor.data();
      mentorData.uid = mentor.id;
      availableMentors.push(mentorData);
    });
    callback(availableMentors);
  });
}

export function matchMentor(mentorID, menteeID) {
  updateUser(mentorID, { partner: menteeID, is_available_mentor: false });
  updateUser(menteeID, { partner: mentorID });
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
  getUser(id, (userData) => {
    const menteeSchool = userData.school;
    const menteeMajor = userDb.major;

    let bestMentorId = null;
    let bestMentorScore = 0;

    getMentors((availableMentors) => {
      availableMentors.forEach((mentor) => { 
        console.log("Evaluating mentor " + mentor.name);
        let currMentorId = mentor.uid;
        console.log("Their UID is " + mentor.uid);
        let currMentorScore = 0;

        if (mentor.school === menteeSchool) {
          currMentorScore += 4;
        }
        if (mentor.major === menteeMajor) {
          currMentorScore += 3;
        }
        console.log("They scored " + currMentorScore);
        if (currMentorScore >= bestMentorScore){
          bestMentorScore = currMentorScore;
          bestMentorId = currMentorId;
        }
      });
      if (bestMentorId) {
        console.log("Matching mentor with " + bestMentorId);
        matchMentor(bestMentorId, id);
      }
    });
  });
}