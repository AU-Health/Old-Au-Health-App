/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server


router.post('/user_create', ensureEmailAndPass, async(req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    let isAdmin = req.body.isAdmin;
    let jwt = await authentication.createUserAccount(userEmail, userPass, isAdmin);
    res.status(200).json({
        status: "ok",
        access_token: jwt
    });
});

router.post('/login', authenticateUserAccount, async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let jwt = await authentication.login(email, password);
    res.status(200).json({
        status: "success",
        access_token: jwt
    })
});




//MIDDLEWARE
//middleware

async function ensureEmailAndPass(req, res, next) {
    let jsonError = { status: "error" }
    let email = req.body.email;
    let password = req.body.password;
    if (!(email.length > 20 && email.substr(email.length - 21) === "@student.american.edu")) {
        jsonError["error"] = "Email not AU"
        res.status(401).json(jsonError);
        return;
    }
    //check if email already exists in the system
    const hashAlgo = require('crypto').createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await require('../database/database').getUserInfoFromEmail(hashedEmail);
    if (queryResult) {
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

async function authenticateUserAccount(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    const hashAlgo = require('crypto').createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await require('../database/database').getUserHashedPasswordFromEmail(hashedEmail);
    if (!queryResult) {
        res.status(401).json({
            status: "error",
            error: "Account with email does not exist"
        })
    }
    let hashedPassword = queryResult["Password"];
    require('bcrypt').compare(password, hashedPassword).then(isPasswordCorrect => {
        if (!isPasswordCorrect) {
            res.status(401).json({
                status: "error",
                error: "Incorrect password"
            })
            return;
        } else {
            next();
        }
    })
};



module.exports = router;