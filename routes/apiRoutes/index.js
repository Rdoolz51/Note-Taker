const express = require('express');
const router = express.Router();
const { writeFile, readFile } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");


//Gets all notes
router.get('/notes', (req, res) => {
    readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if (err) throw err;
        // check to see if the database is empty
        if (!data[0]) {
            res.json('[]');
        } else {

            res.json(JSON.parse(data));
        }
    });
});

//Post note
router.post('/notes', (req, res) => {
    readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        let allNotes = [];
        if (err) throw err;
        if (data[0]) {
            allNotes = JSON.parse(data);
        }
        let newNote = {
            ...req.body,
            id: uuidv4()
        };
        allNotes.push(newNote);

        writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(allNotes), (err) => {
            if (err) throw err;
            res.status(201);
        });
    });

});





module.exports = router;