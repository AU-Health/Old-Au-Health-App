const jwt = require('jsonwebtoken');

//authenticate token of the user ---adds user information to req.user
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //will get us token since it is BEARER TOKEN

    if (!token) {
        return res.status(401).json({
            status: "error",
            error: "No token given"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: "error",
                error: err,
            })
        } else {
            req.user = decoded;
        }
        next();
    })

}

function authenticateRefreshToken(req, res, next) {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({
        status: "error",
        error: "No refresh token given"
    })

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({
            status: "error",
            error: "Refresh token invalid"
        })
        req.user = decoded;

        authentication.isRefreshTokenCorrectForAccount(req.body.uuid, refreshToken).then(isCorrect => {
            if (!isCorrect) {
                return res.status(403).json({
                    status: "error",
                    error: "Refresh token does not exist for account"
                })
            }
        })

        next();
    })
}

module.exports.authenticateToken = authenticateToken;
module.exports.authenticateRefreshToken = authenticateRefreshToken;