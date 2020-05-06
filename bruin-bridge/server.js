const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConf = require('./config/database.config.js');
mongoose.connect(dbConf.url);
const models = require('./config/database.models.js');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.listen(port, () => console.log(`Listening on port ${port}`));

const router = express.Router();


// Our API endpoints call this function if they have to access private data. 
// Right now it's really simple and insecure, but eventually this function 
// will verify an OAuth2 token sent by the client.
function authenticate(req) {
    return (req.body.token && req.body.token === "secretsecretsecret");
}


router.route('/posts')
    .post((req, res) => {
        if (!req.body.title) return res.send({status: "error", error: "title missing"});
        if (!req.body.body) return res.send({status: "error", error: "body missing"});
        else if (!req.body.author) return res.send({status: "error", error: "author missing"});
        else if (!authenticate(req)) 
            return res.send({status: "error", error: "invalid token"});
        var post = models.postModel();
        var post_ts = Date.now();
        post.title = req.body.title;
        post.body = req.body.body;
        post.author = req.body.author;
        post.upvotes = 1;
        post.edited = false,
        post.ts = post_ts,
        post.edited_ts = post_ts
        console.log(post.ts);
        try {
            post.save();
        } catch (err) {
            res.send({status: "error", error: "couldn't write post to db"});
        }
        return res.send({status: "ok", id: post._id});
    })
    .get(async (req, res) => {
        try {
            var query = {}
            if (req.query.timeframe) {
                var d = new Date();
                switch(req.query.timeframe) {
                    case "day":
                        d.setDate(d.getDate() - 1);
                        break;
                    case "week":
                        d.setDate(d.getDate() - 7);
                        break;
                    case "month":
                        d.setMonth(d.getMonth() - 1);
                        break;
                    case "year":
                        d.setFullYear(d.getFullYear() - 1);
                        break;
                    default:
                        d = new Date(0);
                }
                query.ts = {$gt: d};
            }
            queryPipeline = models.postModel.find(query);
            if (req.query.sort) {
                switch(req.query.sort) {
                    default:
                    case "top":
                        queryPipeline = queryPipeline.sort({upvotes: -1});
                        break;
                    case "bottom":
                        queryPipeline = queryPipeline.sort({upvotes: 1});
                        break;
                    case "new":
                        queryPipeline = queryPipeline.sort({ts: -1});
                        break;
                    case "old":
                        queryPipeline = queryPipeline.sort({ts: 1});
                        break;
                }
            } else {
                queryPipeline = queryPipeline.sort({upvotes: -1});
            }
            var posts = await queryPipeline.lean().exec();
            for (i = 0; i < posts.length; i++) {
                posts[i].id = posts[i]._id;
                delete posts[i]._id;
                delete posts[i].__v;
            }
            res.send(posts);
        } catch (err) {
            return res.send({status: "error", error: "error querying posts!"})
        }
    });

router.route('/posts/:id')
    .get(async (req, res) => {
        try {
            var post = await models.postModel.findOne({_id: req.params.id});
            var postJSON = post.toJSON();
            postJSON.id = postJSON._id;
            delete postJSON._id;
            delete postJSON.__v;
            res.send(postJSON);
        } catch (err) {
            return res.send({status: "error", error: err});
        }
    })
    .put(async (req, res) => {
        try {
            if (!authenticate(req)) 
                return res.send({status: "error", error: "invalid token"});
            var post = await models.postModel.findOne({_id: req.params.id});
            if (req.body.title)
                post.title = req.body.title;
            if (req.body.body)
                post.body = req.body.body;
            post.edited = true;
            post.edited_ts = Date.now();
            post.save();
            res.send({status: 'ok'});
        } catch (err) {
            return res.send({status: "error", error: err});
        }
    })
    .delete(async (req, res) => {
        try {
            if (!authenticate(req)) 
                return res.send({status: "error", error: "invalid token"});
            await models.postModel.findOneAndDelete({_id: req.params.id});
            res.send({status: 'ok'})
        } catch (err) {
            return res.send({status: "error", error: err});
        }
    });


// TODO: This endpoint still isn't RESTful as I need to associate votes with users. 
// Modify this endpoint once we have the users database up and running.
router.route('/posts/:id/vote')
    .post(async (req, res) => {
        try {
            if (!authenticate(req)) 
                return res.send({status: "error", error: "invalid token"});   
            var post = await models.postModel.findOne({_id: req.params.id});
            if (req.body.vote === "up" || req.body.vote === 1)
                post.upvotes++;
            else if (req.body.vote === "down" || req.body.vote === -1)
                post.upvotes--;
            post.save();
            return res.send({status: "ok", upvotes: post.upvotes});
        } catch (err) {
            return res.send({status: "error", error: err});
        }
    });

app.use('/api', router);




