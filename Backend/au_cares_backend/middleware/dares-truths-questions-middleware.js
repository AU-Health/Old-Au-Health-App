const authMiddleware = require('./auth-middleware');
const dtqServices = require('../services/dares-truths-questions');

function authenticateAccess(req, res, next) {
    if (!req.query.uuid || req.query.uuid != req.user.uuid) {
        authMiddleware.authenticateAdministrator(req, res, next);
    } else {
        next();
    }
}

async function authenticateTruthHistoryAccess(req, res, next) {
    let truthsHistoryArr = await dtqServices.getTruthsHistory(null, null, null);
    if (!req.user.isAdmin) {
        let truthIdExistsForUser = truthsHistoryArr.some((truthJson) => {
            return truthJson.truthId == truthId;
        })
        if (!truthIdExistsForUser) {
            return res.status(403).json({
                status: "error",
                error: "User does not have permissions to TruthHistory ID:" + req.params.id
            })
        }
    }
    req.truthHistory = truthsHistoryArr;
    return next();
}

module.exports.authenticateAccess = authenticateAccess;
module.exports.authenticateTruthHistoryAccess = authenticateTruthHistoryAccess;