const express = require('express');
const bodyParser = require('body-parser');
const mockedData = require('./data/db.json');
const comments = mockedData.comments;
const usersRoute = require('./routes/users');

const myApp = express();

// Middlewares
myApp.use(bodyParser.urlencoded({extended: false}));
myApp.use(bodyParser.json());
myApp.use('/api', usersRoute);

// Routes
/*
myApp.get('/comments', (request, response) => {
    response.status(200).send(comments);
});

myApp.post('/comments', (request, response) => {
    response.status(409).send({
        message: request.body,
        status: 200
    });
});
*/

module.exports = myApp;