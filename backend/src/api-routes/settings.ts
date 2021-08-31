import express from 'express'
const router = express.Router()

import tokenMiddleware from '../middleware/token-middleware'
import authMiddleware from '../middleware/auth-middleware'
import { sendFeedback } from '../services/settings'
import { response } from 'express'

//post feedback to database
router.post('/feedback', tokenMiddleware.authenticateToken, (req, res) => {
  let feedbackSubject = req.body.subject
  let feedbackBody = req.body.feedback

  sendFeedback(feedbackSubject, feedbackBody)
    .then((response) => {
      if (response == 'error') {
        res.status(500).json({
          status: 'error',
          error: 'Feedback not added to db',
        })
      } else {
        res.status(200).json({
          status: 'ok',
          feedbackSent: {
            subject: feedbackSubject,
            feedback: feedbackBody,
          },
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err,
      })
    })
})

router.get(
  '/feedback/startDate?endDate?',
  tokenMiddleware.authenticateToken,
  authMiddleware.authenticateAdministrator,
  (req, res) => {}
)

module.exports = router
