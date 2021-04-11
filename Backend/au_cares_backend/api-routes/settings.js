const express = require('express')
const router = express.Router();

const tokenMiddleware = require('../middleware/token-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { sendFeedback } = require('../services/settings');
const { response } = require('express');


//post feedback to database
router.post('/feedback', tokenMiddleware.authenticateToken, (req, res) => {
    let feedbackSubject = req.body.subject;
    let feedbackBody = req.body.feedback;

    sendFeedback(feedbackSubject, feedbackBody).then(response => {
        console.log("RESPONSE");
        console.log(response);
        if (response == "error") {
            res.status(500).json({
                status: "error",
                error: "Feedback not added to db"
            })
        } else {
            res.status(200).json({
                status: "ok",
                feedbackSent: {
                    subject: feedbackSubject,
                    feedback: feedbackBody
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            status: "error",
            error: err
        })
    });

});

router.get('/feedback/startDate?endDate?', tokenMiddleware.authenticateToken, authMiddleware.authenticateAdministrator, (req, res) => {

})

module.exports = router;