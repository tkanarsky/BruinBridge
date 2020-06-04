import { firestore } from "./firebase.js"
import { getPost, postExists, updatePost } from "./postDatabase.js"
const commentDb = firestore.collection("comments");

export function commentExists(commentId, callback) {
  commentDb
    .doc(commentId)
    .get()
    .then(doc => {
      callback(doc.exists);
    });
}

export function createComment(user, postId, text, idCallback) {
  if (!user || !postId || !text) return;
  commentDb
    .add({
      body: text,
      parent: postId,
      author_id: user.uid,
      author_name: user.displayName,
      author_avatar: user.photoURL,
      upvotes: 0,
      edited: false,
      timestamp: Date.now(),
      upvoting_users: [],
      downvoting_users: []
    })
    .then(newCommentRef => {
      getPost(postId, data => {
        let replyList = data.replies;
        replyList.push(newCommentRef.id);
        console.log(postId);
        updatePost(postId, { replies: replyList });
        console.log(replyList);
      });
      idCallback(newCommentRef.id);
    });
}

export function updateComment(commentId, data) {
  if (!commentId || !data || !data.body) return false;
  commentExists(commentId, value => {
    if (!value) return false;
    data.edited = true;
    commentDb.doc(commentId).update(data);
  });
}

export function getComment(id, callback) {
  commentDb
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

export function getComments(postId, callback) {
  postExists(postId, value => {
    if (!value) return false;
    commentDb
      .where("parent", "==", postId)
      .get()
      .then(snapshot => {
        let comments = [];
        let commentIDs = [];
        snapshot.forEach(comment => {
          comments.push(comment.data());
          commentIDs.push(comment.id);
        });
        updatePost(postId, {replies: commentIDs});
        callback(comments);
      });
  });
}
