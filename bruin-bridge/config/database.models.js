const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    ts: Date,
    edited: Boolean,
    edited_ts: Date,
    title: String,
    body: String,
    author: String,
    upvotes: Number,

});

let commentSchema = new mongoose.Schema({
    ts: Date,
    post_ts: Date,
    parent_ts: Date,
    body: String,
    author: String,
    upvotes: Number
});


let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    id: String,
    avatar: String,
    major: String,
    bio: String,
    interests: [String],
    grad_year: Date,
    karma: Number, 
    upvoted_posts: [String],
    downvoted_posts: [String]
});

module.exports = {
    postModel: mongoose.model('Post', postSchema),
    commentModel: mongoose.model('Comment', commentSchema),
    userModel: mongoose.model('User', userSchema)
}