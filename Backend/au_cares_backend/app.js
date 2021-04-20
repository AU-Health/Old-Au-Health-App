// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
const tokenMiddleware = require('./middleware/token-middleware');
const express = require('express');
const app = express();

//config .env file
require('dotenv').config({ path: './config/dot.env' });


//required routes files
const authenticationRoute = require('./api-routes/authentication');
const daresTruthsQuestionsRoute = require('./api-routes/dares-truths-questions');
const settings = require('./api-routes/settings');

//allows jsons to be sent in body request
app.use(express.json());

//routes
app.use('/authentication', authenticationRoute);
app.use('/dares-truths-questions', daresTruthsQuestionsRoute);
app.use('/settings', settings);

//test whether server works. Should receive "pong" as response
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
})

app.get('/protected_ping', tokenMiddleware.authenticateToken, (req, res) => {
    return res.status(200).send("protected pong");
})

app.get('/ping-json', (req, res) => {
    res.status(200).json({
        answer: 'pong'
    });
})

app.listen(3000);