const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express();

//required routes files
const authenticationRoute = require('./api-routes/authentication');

//allows jsons to be sent in body request
app.use(express.json());

//routes
app.use('/authentication', authenticationRoute);

//test whether server works. Should receive "pong" as response
app.get('/ping', (req, res) => {
    res.status(200).send("pong");
})

app.listen(3000);