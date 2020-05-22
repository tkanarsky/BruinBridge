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
export const database = firebase.firestore();
export default firebase;

const userDb = database.collection("users");
const postDb = database.collection("posts");

export function userExists(id, callback) {
  userDb.doc(id).get().then((doc) => {
    callback(doc.exists);
  });
}

export function createUser(id, name, email) {
  if (!id || !name || !email) return;
  userDb.doc(id).set(
    {
      name: name,
      email: email,
      major: "",
      year: "",
      bio: "",
      karma: 0
    }
  );
  return true;
}

export function getUser(id, callback) {
  userDb.doc(id).get().then((doc) => {
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

export function createPost(user, title, text, idCallback) {
  if (!user || !title || !text || !user.uid) return false;
  postDb.add({
    title: title,
    body: text,
    author_id: user.uid,
    author_name: user.displayName,
    upvotes: 0,
    edited: false,
    timestamp: Date.now()
  }).then((newPostRef) => {
    idCallback(newPostRef.id);
  });
} 

export function postExists(key, callback) {
  postDb.doc(key).get().then((doc) => {
    callback(doc.exists);
  })
}

export function editPost(key, data) {
  if (!key || !data || (!data.title && !data.body)) return false;
  postExists(key, (value) => {
    if (!value) return false;
      data.updated = true;
      postDb.doc(key).update(data);
  });
}

export function getPosts(params, callback) {
  var query = postDb;
  if (params.sort) {
    switch(params.sort) {
      case 'bottom': 
        query = query.orderBy("upvotes", "asc");
        break;
      case 'top':
        query = query.orderBy("upvotes", "desc");
        break;
      case 'old':
        query = query.orderBy("timestamp", "asc");
        break;
      case 'new':
        query = query.orderBy("timestamp", "desc");
        break;
      default:
        query = query.orderBy("upvotes", "desc");
      break;
    }
  }
  if (params.limit) {
    query = query.limit(params.limit);
  }
  query.get().then((snapshot) => {
    let posts = [];
    snapshot.forEach((doc) =>{
      posts.push(doc.data());
    });
    callback(posts);
  });
}

