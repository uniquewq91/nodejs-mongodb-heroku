const express = require('express');

//create own routes in separate files and import into app.js
const router = express.Router();

//import the module includes our data model for post request
const Post = require('../models/Post');


//-------> GET ALL THE POSTS IN DB
//get means the app send us back some message
//so now posts is this posts.js's main url/address
//for exaple here, the server return a message 
router.get('/', async (req, res) => {
    //res.send('at post-main');
    try{
        //Post is the model 
        //find() is a method of mongoose, if no parameter, return all
        const posts = await Post.find();
        //console.log(posts);
        //res.send(posts);
        res.json(posts);
    } catch(err) {
        res.json({message: err});
    }
});

//get means the app send us back some message
router.get('/123', (req, res) => {
    res.send('at post 123');
});

//-------> SUBMITS A POST
//after to import Post
//because we use body-parser, when visit /posts, with post request, we monitor the body
// router.post('/', (req, res) => {
//      //console.log(req.body);
// });
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    //after create the data, we save it to DB
    //post.save()  returns a promise
    //then we use then(), data is the previous promise's resolved data
    // post.save() 
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     alert(err);
    // })

    //savedPost is the resolved/fulfilled value of the promise
    //await pause the program and wait the function to finish
    //res.json is a middleware in express module
    try {
        const savedPost = await post.save();
        res.json(savedPost);  
    } catch(err) {
        //send a json response
        //res.status(401).json({message: err});
        res.json({message: err});
    }
}); 

//-------> GET A SPECIFIC POST
//:postId is a dynamic parameter
//anything add after /posts
//we can use other method to do the search/read/find function
router.get('/:postId', async (req, res) => {
    //console.log(req.params.postId);
    try {
        const singlepost = await Post.findById(req.params.postId);

        res.json(singlepost);
    } catch(err) {
        res.json({message: err});
    }
});

//-------> DELETE A SPECIFIC POST 
router.delete('/:postId', async (req, res) => {
    try {
        //following Post.remove will return a promise
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//-------> UPDATE A SPECIFIC POST 
router.patch('/:postId', async (req, res) => {
    try {
        //following Post.remove will return a promise
        //first _id criteria is for data matching
        //second paramater is for specific change 
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        );
        res.json(updatedPost);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
