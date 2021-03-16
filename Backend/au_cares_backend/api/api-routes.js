/*File will have all of the routes*/

const authentication = require('../services/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const app = express(); //used to set up an express server

//Test status of server
app.get('/ping', (req, res) => {
    res.status(200).send("pong");
})


app.post('/createAccount', (req, res) => {
    let userEmail = req.body.userEmail;
    if (userEmail.substr(userEmail.length - 21) === "@student.american.edu") {
        let userPass = req.body.password;
        let accessCode = authentication.createUserAccount(userEmail, userPass);
    } else {
        res.sendStatus(401);
    }

});


app.post('/login', (req, res) => {
    authentication.login();
});


app.listen(3000);