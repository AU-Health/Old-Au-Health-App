//MIDDLEWARE methods
const { json } = require("express");
const jwt = require('jsonwebtoken');
const authentication = require("../services/authentication");

//Ensure email and password are valid to create a new account
async function ensureEmailAndPass(req, res, next) {
    let jsonError = { status: "error" }
    let email = req.body.email;
    let password = req.body.password;
    if (!(email.length >= 14 && email.match(/[a-z0-9]+@(student.)?american.edu$/))) {
        jsonError["error"] = "Email not AU"
        res.status(401).json(jsonError);
        return;
    }
    //check if email already exists in the system
    if (await authentication.accountExists(email, "email")) {
        jsonError["error"] = "Account under email already exists"
        res.status(401).json(jsonError);
        return;
    }

    if (!(password.length >= 8)) {
        jsonError["error"] = "Password too short";
        res.status(401).json(jsonError);
        return;
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
        jsonError["error"] = "Not enough capital letters. Need at least 1 uppercase";
        res.status(401).json(jsonError);
        return;
    }
    if (!countLowerCase >= 1) {
        jsonError["error"] = "Not enough lowercase letters. Need at least 1 lowercase";
        res.status(401).json(jsonError);
        return;
    }
    if (!countNonChars >= 1) {
        jsonError["error"] = "Not enough non-characters. Need at least 1";
        res.status(401).json(jsonError);
        return;
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


//ensures uuid exists
async function ensureUUIDExists(req, res, next) {
    let uuid = req.body.uuid;
    if (!await authentication.accountExists(uuid, "UUID")) {
        return res.status(401).json({
            status: "error",
            error: "No account with UUID"
        })
    }
    next();
}



//Authenticate user account, ensuring account is correct
async function authenticateUserAccount(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (!await authentication.accountExists(email, "email")) {
        return res.status(401).json({
            status: "error",
            error: "Account with email does not exist"
        });
    }
    let isPasswordCorrect = await authentication.isPasswordCorrectForAccount(email, password);
    if (!isPasswordCorrect) {
        return res.status(403).json({
            status: "error",
            error: "Incorrect password"
        })
    }
    next();
};

//authenticate token of the user
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
        req.body.uuid = decoded['uuid'];
        next();
    })
}


module.exports.ensureEmailAndPass = ensureEmailAndPass;
module.exports.authenticateUserAccount = authenticateUserAccount;
module.exports.authenticateToken = authenticateToken;
module.exports.authenticateRefreshToken = authenticateRefreshToken;
module.exports.ensureUUIDExists = ensureUUIDExists;