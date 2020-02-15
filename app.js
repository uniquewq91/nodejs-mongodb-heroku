const express = require('express'); //after create an express, we can start routes
const mongoose = require('mongoose'); //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
require('dotenv/config'); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
const postsRoute = require('./routes/posts'); //import custom Routes
const notesRoute = require('./routes/notes'); //import custom Routes
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); //Providing a Connect/Express middleware that can be used to enable CORS

const app = express();

//------> middleware
//anytime we hit any request, we make sure this body parser run
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. 
//This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(bodyParser.json()); 
app.use(cors());

//everytime a request touches posts, we will use postsRoute to response the request
//so it just like a middleware
app.use('/posts', postsRoute);

app.use('/notes', notesRoute);

app.get('/', (req, res) => {
    res.end('This is home page / root.');
    console.log('we are at home');
});

//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connect to db')
);

//listen to the server
app.listen(3000);

 
/**
 * app logic
 * 
 * create a app to test the connection with MongoBD
 * and the app should have the ability to CRUD, create, read, update, delete function 
 * 
 * when request a main page /, just return/display/console  this is main or whatever
 * 
 * when request /posts, we use postsRoute module to process all related request
 * 
 * !!!need to watch back why use body parser
 * 
 * after we create the server and test the connect to this server, we create the conenction to DB
 * 
 * in order to match the POST data, we define a data model in this app, in Post.js file
 * it use mongoose module and mongoose.Schema({})
 * we then export this module for use 
 * in the posts.js, we implement all the related functions, with data model and data map
 * 
 */