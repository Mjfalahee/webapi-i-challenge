// implement your API here


const express = require('express');
const db = require('./data/db');
const server = express();

//middleware


server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'The user information could not be retrieved',
            });
        });
});

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at} = req.body;

    if (!name || !bio) {
        res.status(400).json({
            success: false,
            message: 'Please provide name and bio for the user',
        });
    }

    db.insert({
        name, bio, created_at, updated_at
    })
        .then(resp => {
            res.status(201).json(resp);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'There was an error while saving the user to the database',
                err,
            })
        })
})


server.listen(5000, () => console.log('Server running on port 5000'));