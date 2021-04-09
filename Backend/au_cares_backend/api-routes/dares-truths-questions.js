const authMiddleware = require('../middleware/auth-middleware');
const tokenMiddleware = require('../middleware/token-middleware');

//For Express
const express = require("express");
const router = express.Router();

router.get('/truthsHistory/current?/attempted?/topic?/:id?', tokenMiddleware.authenticateToken, (req, res) => {
    let uuid = req.body.uuid;
    if (req.params.id && req.params.id == uuid) {
        //do for the user
    } else {
        authMiddleware.authenticateAdministrator(req, res, next);
    }
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