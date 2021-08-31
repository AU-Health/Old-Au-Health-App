const authMiddleware = require('./auth-middleware');
const dtqServices = require('../services/dares-truths-questions');

//authenticateAcess to a get request of a truth, dare, ore question
function authenticateAccess(req, res, next) {
    if (!req.query.uuid || req.query.uuid != req.user.uuid) {
        authMiddleware.authenticateAdministrator(req, res, next);
    } else {
        next();
    }
}

function ensureBodyHasResponse(req, res, next) {
    if (!req.body.response) {
        return res.status(400).json({
            status: "error",
            error: "No body given for response"
        })
    }
    next();
}

//authenticate user has access to a specific truthId.
async function authenticateTruthHistoryAccess(req, res, next) {
    let userFoundTruthJson;
    let truthsHistoryArr = await dtqServices.getTruthsHistory(true, null, null, req.user.uuid); //user can only edit current truths

    for (let truthJson of truthsHistoryArr) {
        if (truthJson.TruthHistoryId == req.params.id) {
            userFoundTruthJson = truthJson;
            break;
        }
    }

    if (!userFoundTruthJson) {

        return res.status(403).json({
            status: "error",
            error: "User does not have access to TruthHistoryId " + req.params.id
        })
    }
    if (userFoundTruthJson.Data != null) {
        return res.status(403).json({
            status: "error",
            error: "Response has already been submitted for TruthHistoryId " + req.params.id
        })
    }
    return next();
}

module.exports.authenticateAccess = authenticateAccess;
module.exports.authenticateTruthHistoryAccess = authenticateTruthHistoryAccess;
module.exports.ensureBodyHasResponse = ensureBodyHasResponse;