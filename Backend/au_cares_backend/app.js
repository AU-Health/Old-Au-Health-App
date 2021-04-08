// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
const middleware = require('./middleware/auth_middleware');
const express = require('express');
const app = express();

//config .env file
require('dotenv').config({ path: './config/dot.env' });


//required routes files
const authenticationRoute = require('./api-routes/authentication');

//allows jsons to be sent in body request
app.use(express.json());

//routes
app.use('/authentication', authenticationRoute);

//test whether server works. Should receive "pong" as response
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
})

app.get('/protected_ping', middleware.authenticateToken, (req, res) => {
    res.status(200).send('pong');
})

app.listen(3000);