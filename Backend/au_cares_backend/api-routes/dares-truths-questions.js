const authMiddleware = require('../middleware/auth-middleware');
const tokenMiddleware = require('../middleware/token-middleware');
const dtqMiddleware = require('../middleware/dares-truths-questions-middleware');

//For Express
const express = require("express");
const { getTruthsHistory } = require('../services/dares-truths-questions');
const router = express.Router();

router.get('/truthsHistory', tokenMiddleware.authenticateToken, dtqMiddleware.authenticateAccess, async(req, res) => {
    //send request with values
    let truthsHistoryArr = await getTruthsHistory(req.query.isCurrent, req.query.isComplete, req.query.category, req.query.uuid);

    res.status(200).json({
        status: "ok",
        truthsHistory: truthsHistoryArr
    })

});

router.get('/daresHistory/:current?/:attempted?/:topic?/:id?', tokenMiddleware.authenticateToken, (req, res) => {
    let uuid = req.body.uuid;
    if (req.query.id && req.query.id == uuid) {
        //do for the user
    } else {
        middleware.authenticateAdministrator(req, res, next);
    }
});

router.get('/questionsHistory/current?/attempted?/topic?/:id?', tokenMiddleware.authenticateToken, (req, res) => {
    let uuidSearched;
    if (req.query.id && req.query.id == req.user.uuid) {
        uuidSearched = req.user.uuid;
        //do for the user
    } else {
        middleware.authenticateAdministrator(req, res, next);
        uuidSearched = req.query.id;
    }
});


module.exports = router;