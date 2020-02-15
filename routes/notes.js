const express = require('express');

//create own routes in separate files and import into app.js
const router = express.Router();

//import the module includes our data model for post request
const Note = require('../models/Note');


//-------> GET ALL THE NOTES IN DB
//get means the app send us back some message
//so now notes is this notes.js's main url/address
//for exaple here, the server return a message 
router.get('/', async (req, res) => {
    try{
        //Note is the model 
        //find() is a method of mongoose, if no parameter, return all
        const notes = await Note.find();
        res.json(notes);
    } catch(err) {
        res.json({message: err});
    }
});

//-------> SUBMITS A NOTE
//after to import Note
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedNote = await note.save();
        res.json(savedNote);  
    } catch(err) {
        res.json({message: err});
    }
}); 

module.exports = router;
