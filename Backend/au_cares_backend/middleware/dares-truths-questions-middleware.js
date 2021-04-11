const authMiddleware = require('./auth-middleware');

function authenticateAccess(req, res, next) {
    if (!req.query.uuid || req.query.uuid != req.user.uuid) {
        authMiddleware.authenticateAdministrator(req, res, next);
    } else {
        next();
    }
}

module.exports.authenticateAccess = authenticateAccess;