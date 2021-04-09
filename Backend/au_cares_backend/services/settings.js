const { response } = require('express');
const e = require('express');
const dbConnection = require('../database/database');

async function sendFeedback(subject, feedback) {
    return dbConnection.postFeedback(subject, feedback).then(response => {
        if (response.affectedRows) {
            return "success"
        } else {
            return "error";
        }
    }).catch(err => {
        return err;
    })
}

module.exports.sendFeedback = sendFeedback;