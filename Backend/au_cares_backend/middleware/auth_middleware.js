//MIDDLEWARE methods
const jwt = require('jsonwebtoken');
const authentication = require("../services/authentication");
const bcrypt = require('bcrypt');


//Ensure email and password are valid to create a new account
async function ensureEmailAndPass(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (!(email.length >= 14 && email.match(/[a-z0-9]+@(student.)?american.edu$/))) {
        return res.status(401).json({
            status: "error",
            error: "Email not AU"
        });
    }
    //check if email already exists in the system
    if (await authentication.getUserInformationFromEmail(email, false)) {
        return res.status(401).json({
            status: "error",
            error: "Account under email already exists"
        });
    }
    if (!(password.length >= 8)) {
        return res.status(401).json({
            status: "error",
            error: "Password too short"
        });
    }
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countNonChars = 0;
    for (let i = 0; i < password.length; i++) {
        let currentChar = password[i];
        if (isLetter(currentChar)) //if letter
        {
            isUpperCase(currentChar) ? countUpperCase++ : countLowerCase++;
        } else {
            countNonChars++;
        }
    }
    if (!countUpperCase >= 1) {
        return res.status(401).json({
            status: "error",
            error: "Not enough capital letters. Need at least 1 uppercase"
        });
    }
    if (!countLowerCase >= 1) {
        return res.status(401).json({
            status: "error",
            error: "Not enough lowercase letters. Need at least 1 lowercase"
        });
    }
    if (!countNonChars >= 1) {
        return res.status(401).json({
            status: "error",
            error: "Not enough non-characters. Need at least 1"
        });
    }
    next();

    function isUpperCase(letter) {
        return letter === letter.toUpperCase();
    }

    function isLetter(letter) {
        let charCode = letter.charCodeAt(0);
        return (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122);
    }
}



//Authenticate user account, ensuring account is correct. Adds user's uuid and whether verified to request
async function authenticateUserAccount(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    let queryResult = await authentication.getUserInformationFromEmail(email, false);

    if (!queryResult) {
        return res.status(401).json({
            status: "error",
            error: "Account with email does not exist"
        });
    }
    let hashedPassword = queryResult["Password"];

    if (!await bcrypt.compare(password, hashedPassword)) {
        return res.status(403).json({
            status: "error",
            error: "Incorrect password"
        })
    }
    req.user = {};
    req.user.uuid = queryResult["UuidFromBin(UUID)"].toString();
    req.user.isVerified = !!queryResult["UserVerified"];
    next();
};

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

//Verify user verification code
async function verifyVerificationCode(req, res, next) {
    let uuid = req.user.uuid;
    let queryResult = await authentication.getUserVerificationCode(uuid);

    if (!queryResult) {
        return res.status(401).json({
            status: "error",
            error: "No verification code or account has already been verified"
        })
    }
    let verificationCode = req.body.verificationCode;
    let verificationCodeFromDB = queryResult["ConfirmationCode"];
    let expirationDate = queryResult["Expiration"];

    if (expirationDate && expirationDate < Date.now()) {
        return res.status(401).json({
            status: "error",
            error: "Verification code expired"
        })
    }
    if (verificationCode != verificationCodeFromDB) {
        return res.status(401).json({
            status: "error",
            error: "Incorrect verification code"
        })
    }
    next();
}

async function authenticateLogout(req, res, next) {
    let uuid = req.user.uuid;
    let queryResult = await authentication.logout(uuid);
    if (queryResult === undefined) {
        return res.status(500).json({
            status: "error",
            error: "Server error. Did not logout"
        })
    }
    if (queryResult == 0) {
        return res.status(401).json({
            status: "error",
            error: "Already logged out"
        })
    }
    next();
}



//Authenticates user is an admin
function authenticateAdministrator(req, res, next) {
    let isAdmin = req.user.isAdmin;

    if (!isAdmin) {
        return res.status(403).json({
            status: "error",
            error: "Access restricted to admins only"
        })
    }
    next();
}


module.exports.ensureEmailAndPass = ensureEmailAndPass;
module.exports.authenticateUserAccount = authenticateUserAccount;
module.exports.authenticateToken = authenticateToken;
module.exports.authenticateRefreshToken = authenticateRefreshToken;
module.exports.authenticateAdministrator = authenticateAdministrator;
module.exports.verifyVerificationCode = verifyVerificationCode;
module.exports.authenticateLogout = authenticateLogout;