const mongoose = require('mongoose');

//this is the data model for Post data
//create schema 
//represent how the post look

//pass in an object, like describe some properties 
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//once we have the schema, we export and give it a name -> Posts, and the Schema we should use
//this model is the thing gonna showup in DB
module.exports = mongoose.model('Posts', PostSchema);