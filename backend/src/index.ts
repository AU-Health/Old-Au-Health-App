// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
import tokenMiddleware from './middleware/token-middleware'
import express from 'express'
const app = express()

//config .env file
require('dotenv').config({ path: './config/dot.env' })

//required routes files
import authenticationRoute from './api-routes/authentication'
import daresTruthsQuestionsRoute from './api-routes/dares-truths-questions'
import settingsRoute from './api-routes/settings'
import resourcesRoute from './api-routes/resources'

//allows jsons to be sent in body request
app.use(express.json())

//routes
app.use('/authentication', authenticationRoute)
app.use('/dares-truths-questions', daresTruthsQuestionsRoute)
app.use('/settings', settingsRoute)
app.use('/resources', resourcesRoute)

//test whether server works. Should receive "pong" as response
app.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

app.get('/protected_ping', tokenMiddleware.authenticateToken, (req, res) => {
  return res.status(200).send('protected pong')
})

app.get('/ping-json', (req, res) => {
  res.status(200).json({
    answer: 'pong',
  })
})

app.listen(3000)
