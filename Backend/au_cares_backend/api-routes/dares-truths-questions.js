const authMiddleware = require('../middleware/auth-middleware');
const tokenMiddleware = require('../middleware/token-middleware');

//For Express
const express = require("express");
const { getTruthsHistory } = require('../services/dares-truths-questions');
const router = express.Router();

router.get('/truthsHistory/current?/topic?/:id?', tokenMiddleware.authenticateToken, async(req, res) => {
    let uuid = req.body.uuid;
    if (req.query.id && req.query.id == uuid) {
        //do for the user
    } else {
        authMiddleware.authenticateAdministrator(req, res, next);
    }
    //send request with values
    return await getTruthsHistory(req.query.current, req.query.topic, uuid);

});

router.get('/daresHistory/current?/attempted?/topic?/:id?', tokenMiddleware.authenticateToken, (req, res) => {
    let uuid = req.body.uuid;
    if (req.params.id && req.params.id == uuid) {
        //do for the user
    } else {
        middleware.authenticateAdministrator(req, res, next);
    }
});

router.get('/questionsHistory/current?/attempted?/topic?/:id?', tokenMiddleware.authenticateToken, (req, res) => {
    let uuidSearched;
    if (req.params.id && req.params.id == req.user.uuid) {
        uuidSearched = req.user.uuid;
        //do for the user
    } else {
        middleware.authenticateAdministrator(req, res, next);
        uuidSearched = req.params.id;
    }
});


module.exports = router;