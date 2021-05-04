const express = require('express');
const router = express.Router();
const { getResources } = require('../services/resources');


router.get('/health-resources', (req, res) => {

    let selectedResource = req.query.specificResource || null;
    getResources(selectedResource)
        .then(resources => {
            res.status(200).json({
                status: "ok",
                resources: resources
            })
        })
        .catch(err => {
            res.status(401).json({
                status: "error",
                error: err
            })
        })
})



module.exports = router;