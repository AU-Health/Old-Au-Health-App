/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');
const middleware = require("./middleware");

//this will be the class for the routes
const express = require("express"); //import express
const { notStrictEqual } = require('assert');
const router = express.Router(); //used to set up an express server


/*Create a new user*/
router.post('/user_create', middleware.ensureEmailAndPass, async(req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    let isAdmin = req.body.isAdmin;
    let createdUserInfo = await authentication.createUserAccount(userEmail, userPass, isAdmin);
    res.status(200).json({
        status: "ok",
        access_token: createdUserInfo[1],
        uuid: createdUserInfo[0]
    });
});

/*Login a user*/
router.post('/login', middleware.authenticateUserAccount, async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loginUserInfo = await authentication.login(email, password);

    res.status(200).json({
        status: "ok",
        uuid: loginUserInfo[0],
        access_token: loginUserInfo[1],
        refresh_token: loginUserInfo[2]
    })
});

router.put('/logout', middleware.ensureUUIDExists, async(req, res) => {
    let uuid = req.body.uuid;
    let result = await authentication.logout(uuid);
    if (result == "error") {
        res.status(500).json({
            status: "error",
            error: "Didnt logout"
        })
    }
    res.status(201).json({
        status: "ok",
        message: "User logout success"
    })

})


router.post('/token', middleware.authenticateRefreshToken, middleware.ensureUUIDExists, (req, res) => {
    let uuid = req.body.uuid;
    let newAccessToken = authentication.generateAccessToken(uuid);

    res.status(201).json({
        access_token: newAccessToken
    })


})



router.post('/verifyAccount', (req, res) => {
    let uuid = req.body.uuid;
    let verificationCode = req.body.verificationCode;
    let accountVerified = authentication.verifyUserAccount(uuid, verificationCode);
    if (accountVerified) {
        res.status(200).json({
            status: "ok",
            info: "Account verified"
        })
    } else {
        res.status(403).json({
            status: "error",
            info: "Account not verified"
        })
    }
})


module.exports = router;