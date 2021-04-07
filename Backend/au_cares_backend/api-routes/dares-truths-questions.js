import { response } from 'express';
import middleware from '../middleware/auth_middleware';

//For Express
const express = require("express");
const router = express.Router();

router.get('/truths/:id?', middleware.authenticateToken, middleware.authenticateAdministrator, (req, res) => {
    let uuid;
    if (id) {
        middleware.authenticateAdministrator(req, res, next);
        uuid = req.params.id;
    } else {
        uuid = req.body.uuid;
    }

});



module.exports = router;