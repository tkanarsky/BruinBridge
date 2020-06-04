import { firestore } from "./firebase.js"
import { getUser, updateUser } from "./userDatabase.js"

const postDb = firestore.collection("posts");

export function createPost(user, title, text, idCallback) {
  if (!user || !title || !text || !user.uid) return false;
  postDb
    .add({
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
    })
    .then(newPostRef => {
      idCallback(newPostRef.id);
    });
}

export function postExists(key, callback) {
  postDb
    .doc(key)
    .get()
    .then(doc => {
      callback(doc.exists);
    });
}

export function updatePost(key, data) {
  if (!key || !data /* || (!data.title && !data.body)*/) return false;
  postExists(key, value => {
    if (!value) return false;
    data.edited = true;
    postDb.doc(key).update(data);
  });
}

export function getPost(id, callback) {
  postDb
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

export function getPosts(params, callback) {
  var query = postDb;
  switch (params.sort) {
    case "bottom":
      query = query.orderBy("upvotes", "asc");
      break;
    case "top":
      query = query.orderBy("upvotes", "desc");
      break;
    case "old":
      query = query.orderBy("timestamp", "asc");
      break;
    case "new":
      query = query.orderBy("timestamp", "desc");
      break;
    default:
      query = query.orderBy("upvotes", "desc");
      break;
  }
  if (params.limit) {
    query = query.limit(params.limit);
  }
  query.get().then(snapshot => {
    let posts = [];
    snapshot.forEach(doc => {
      let docData = doc.data();
      docData.post_id = doc.id;
      posts.push(docData);
    });
    callback(posts);
  });
}

export function upvotePost(userId, postId, successCallback) {
  postExists(postId, exists => {
    if (!exists) {
      successCallback(false);
      return;
    }
    getPost(postId, postData => {
      if (postData.upvoting_users.includes(userId)) {
        successCallback(false);
        return;
      } else if (postData.downvoting_users.includes(userId)) {
        let idIndex = postData.downvoting_users.indexOf(userId);
        postData.downvoting_users.splice(idIndex, 1);
        postData.upvotes += 2;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma += 2) });
        });
      } else {
        postData.upvotes += 1;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma += 1) });
        });
      }
      postData.upvoting_users.push(userId);
      updatePost(postId, postData);
      successCallback(true);
    });
  });
}

export function downvotePost(userId, postId, successCallback) {
  postExists(postId, exists => {
    if (!exists) {
      successCallback(false);
      return;
    }
    getPost(postId, postData => {
      if (postData.downvoting_users.includes(userId)) {
        successCallback(false);
        return;
      } else if (postData.upvoting_users.includes(userId)) {
        let idIndex = postData.upvoting_users.indexOf(userId);
        postData.upvoting_users.splice(idIndex, 1);
        postData.upvotes -= 2;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma -= 2) });
        });
      } else {
        postData.upvotes -= 1;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma -= 1) });
        });
      }
      postData.downvoting_users.push(userId);
      updatePost(postId, postData);
      successCallback(true);
    });
  });
}

export function removeVote(userId, postId, successCallback) {
  postExists(postId, exists => {
    if (!exists) {
      successCallback(false);
      return;
    }
    getPost(postId, postData => {
      if (postData.downvoting_users.includes(userId)) {
        let idIndex = postData.downvoting_users.indexOf(userId);
        postData.downvoting_users.splice(idIndex, 1);
        postData.upvotes += 1;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma += 1) });
        });
        successCallback(true);
      } else if (postData.upvoting_users.includes(userId)) {
        let idIndex = postData.upvoting_users.indexOf(userId);
        postData.upvoting_users.splice(idIndex, 1);
        postData.upvotes -= 1;
        getUser(postData.author_id, userData => {
          updateUser(postData.author_id, { karma: (userData.karma -= 1) });
        });
        successCallback(true);
      } else {
        successCallback(false);
        return;
      }
      updatePost(postId, postData);
    });
  });
}

export function timeSince(timestamp) {
  let now = new Date();
  let secondsPast = (now.getTime() - timestamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's ago';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm ago';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h ago';
  }
  if (secondsPast > 86400) {
    let d = new Date(timestamp);
    let day = d.getDate();
    let month = d.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    let year = d.getFullYear() == now.getFullYear() ? "" : " " + d.getFullYear();
    return day + " " + month + year;
  }
}