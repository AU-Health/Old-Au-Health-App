/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server


router.post('/user_create', ensureEmailAndPass, (req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    authentication.createUserAccount(userEmail, userPass);
    res.status(200);

});

router.post('/login', (req, res) => {
    authentication.login();
});




//MIDDLEWARE
//middleware

function ensureEmailAndPass(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email.substr(email.length - 21) === "@student.american.edu") {
        res.status(401).send("Email not AU");
    }
    //ensure doesnt exist in the db
    //if(in db)

    //for passwords
    if (!password.length >= 8) {
        res.status(401).send("Password too short");
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
        res.status(401).send("Not enough capital letters. Need at least 1 uppercase");
    }
    if (!countLowerCase >= 1) {
        res.status(401).send("Not enough lowercase letters. Need at least 1 lowercase");
    }
    if (!countNonChars >= 1) {
        res.status(401).send("Not enough letters and signs. Need at least 1");
    }
    next();
    return;

    function isUpperCase(letter) {
        return letter === letter.toUpperCase();
    }

    function isLetter(letter) {
        let charCode = letter.charCodeAt(0);
        return (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122);
    }
}



module.exports = router;