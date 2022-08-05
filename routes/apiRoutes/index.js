const express = require('express');
const router = express.Router();
const { writeFile, readFile } = require('fs');
const path = require('path');


//Gets all notes
router.get('/notes', (req, res) => {
    readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        if (err) throw err;
        if (!data) {
            res.json([]);
        }
        res.json(JSON.parse(data));
    });
});

//Post note
router.post('/notes', (req, res) => {
    readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        let allnotes = [];
        if (err) throw err;
        if (data) {
            let allNotes = JSON.parse(data);
            let newNote = req.body;
        }
        allNotes.push(newNote);

        writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(allNotes), (err) => {
            if (err) throw err;
            res.status(201);
        });
    });

});



module.exports = router;