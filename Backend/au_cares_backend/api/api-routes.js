/*File will have all of the routes*/

const authentication = require('../services/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const app = express(); //used to set up an express server

app.post('/createAccount', (req, res) => {
    let userEmail = req.userEmail;
    if (userEmail.substr(userEmail.length - 21) === "@student.american.edu") {
        let userPass = req.password;
        let accessCode = authentication.createUserAccount(userEmail, userPass);
    } else {
        res.sendStatus(401);
    }

});


app.post('/login', (req, res) => {
    authentication.login();
});