/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');
const middleware = require("./middleware");

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server


/*Create a new user*/
router.post('/user_create', middleware.ensureEmailAndPass, async(req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    let isAdmin = req.body.isAdmin;
    let createdUserInfo = await authentication.createUserAccount(userEmail, userPass, isAdmin);
    res.status(200).json({
        status: "ok",
        uuid: createdUserInfo[0],
        access_token: createdUserInfo[1]
    });
});

/*Login a user*/
router.post('/login', middleware.authenticateUserAccount, async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loginUserInfo = await authentication.login(email, password);

    res.status(200).json({
        status: "ok",
        isVerified: loginUserInfo[1],
        uuid: loginUserInfo[0],
        access_token: loginUserInfo[2],
        refresh_token: loginUserInfo[3]
    })
});

/*Logout user by removing their refresh token*/
router.put('/logout', middleware.authenticateToken, async(req, res) => {
    let uuid = req.user.uuid;
    let result = await authentication.logout(uuid);
    if (result === undefined) {
        return res.status(500).json({
            status: "error",
            error: "Server error. Did not logout"
        })
    }
    if (result == 0) {
        return res.status(401).json({
            status: "error",
            error: "Already logged out"
        })
    }

    res.status(201).json({
        status: "ok",
        message: "User logout success"
    })

})

/*Gives user a new access token upon given a good refresh token*/
router.post('/token', middleware.authenticateRefreshToken, (req, res) => {
    let uuid = req.user.uuid;
    let newAccessToken = authentication.generateAccessToken(uuid);

    res.status(201).json({
        access_token: newAccessToken
    })


})

//verify email of account
router.put('/verifyAccount', middleware.authenticateToken, async(req, res) => {
    let uuid = req.user.uuid;
    let verificationCode = req.body.verificationCode;
    let accountVerifiedInfo = await authentication.verifyUserAccount(uuid, verificationCode);
    if (accountVerifiedInfo[0]) {
        res.status(200).json({
            status: "ok",
            info: accountVerifiedInfo[1],
            refreshToken: accountVerifiedInfo[2]
        })
    } else {
        res.status(403).json({
            status: "error",
            error: accountVerifiedInfo[1]
        })
    }
})


module.exports = router;