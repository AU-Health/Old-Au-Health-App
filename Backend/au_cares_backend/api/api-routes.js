/*File will have all of the routes*/

const authentication = require('../modules/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const app = express(); //used to set up an express server

app.post('/createAccount', (req, res) => {

});


app.post('/login', (req, res) => {
    authentication.login();
});