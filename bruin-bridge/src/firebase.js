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
const commentDb = database.collection("comments");

export function userExists(id, callback) {
  userDb.doc(id).get().then((doc) => {
    callback(doc.exists);
  });
}

export function createUser(user) {
  if (!user) return;
  userDb.doc(user.uid).set(
    {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
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
    author_avatar: user.photoURL,
    upvotes: 0,
    edited: false,
    timestamp: Date.now(),
    upvoting_users: [],
    downvoting_users: [],
    replies: []
  }).then((newPostRef) => {
    idCallback(newPostRef.id);
  });
} 

export function postExists(key, callback) {
  postDb.doc(key).get().then((doc) => {
    callback(doc.exists);
  })
}

export function updatePost(key, data) {
  if (!key || !data || (!data.title && !data.body)) return false;
  postExists(key, (value) => {
    if (!value) return false;
      data.edited = true;
      postDb.doc(key).update(data);
  });
}


export function getPost(id, callback) {
  postDb.doc(id).get().then((doc) => {
    if (doc.exists) {
      callback(doc.data());
    } else {
      callback(null);
    }
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
      let docData = doc.data();
      docData.post_id = doc.id;
      posts.push(docData);
    });
    callback(posts);
  });
}

export function upvotePost(userId, postId) {
  postExists(postId, (exists) => {
    if (!exists) return;
    getPost(postId, (postData) => {
      if (postData.upvoting_users.includes(userId)) return;
      else if (postData.downvoting_users.includes(userId)) {
        let idIndex = postData.downvoting_users.indexOf(userId);
        postData.downvoting_users.splice(idIndex, 1);
        postData.upvotes += 2;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma += 2});
        });
      } else {
        postData.upvotes += 1;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma += 1});
        });
      }
      postData.upvoting_users.push(userId);
      updatePost(postId, postData);
    });
  });
}

export function downvotePost(userId, postId) {
  postExists(postId, (exists) => {
    if (!exists) return;
    getPost(postId, (postData) => {
      if (postData.downvoting_users.includes(userId)) return;
      else if (postData.upvoting_users.includes(userId)) {
        let idIndex = postData.upvoting_users.indexOf(userId);
        postData.upvoting_users.splice(idIndex, 1);
        postData.upvotes -= 2;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma -= 2});
        });
      } else {
        postData.upvotes -= 1;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma -= 1});
        });
      }
      postData.downvoting_users.push(userId);
      updatePost(postId, postData);
    });
  });
}

export function removeVote(userId, postId) {
  postExists(postId, (exists) => {
    if (!exists) return;
    getPost(postId, (postData) => {
      if (postData.downvoting_users.includes(userId)) {
        let idIndex = postData.downvoting_users.indexOf(userId);
        postData.downvoting_users.splice(idIndex, 1);
        postData.upvotes += 1;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma += 1});
        });
      } else if (postData.upvoting_users.includes(userId)) {
        let idIndex = postData.upvoting_users.indexOf(userId);
        postData.upvoting_users.splice(idIndex, 1);
        postData.upvotes -= 1;
        getUser(postData.author_id, (userData) => {
          updateUser(postData.author_id, {karma: userData.karma -= 1});
        });
      }
    });
  });
}

export function commentExists(commentId, callback) {
  commentDb.doc(commentId).get().then((doc) => {
    callback(doc.exists);
  });
}

export function createComment(user, postId, text, idCallback) {
  if (!user || !postId || !text) return;
  commentDb.add({
    body: text,
    parent: postId,
    author_id: user.uid,
    author_name: user.displayName,
    author_avatar: user.photoURL,
    upvotes: 0,
    edited: false,
    timestamp: Date.now(),
    upvoting_users: [],
    downvoting_users: [],
  }).then((newCommentRef) => {
    getPost(postId, (data) => {
      let replyList = data.replies;
      replyList.push(newCommentRef.id);
      updatePost(postId, {replies: replyList});
    })
    idCallback(newCommentRef.id);
  });
};

export function updateComment(commentId, data) {
  if (!commentId || !data || !data.body) return false;
  commentExists(commentId, (value) => {
    if (!value) return false;
    data.edited = true;
    commentDb.doc(commentId).update(data);
  });
}

// export function getComments(postId, data) {
//   postExists(postId, (value) => {
//     if (!value) return false;
//     let 
//   })
// }