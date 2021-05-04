/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');
const authMiddleware = require("../middleware/auth-middleware");
const tokenMiddleware = require('../middleware/token-middleware');

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server


/*Create a new user*/
router.post('/user_create', authMiddleware.ensureEmailAndPass, (req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    let isAdmin = req.body.isAdmin;
    authentication.createUserAccount(userEmail, userPass, isAdmin)
        .then(createdUserInfo => {
            res.status(200).json({
                status: "ok",
                uuid: createdUserInfo.uuid,
                accessToken: createdUserInfo.accessToken
            });
        })
        .catch(err => {
            res.status(401).json({
                status: "error",
                error: err
            })
        })

});

/*Login a user*/
router.post('/login', authMiddleware.authenticateUserAccount, (req, res) => {
    let uuid = req.user.uuid;
    let isVerified = req.user.isVerified;
    authentication.login(uuid, isVerified)
        .then(loginUserInfo => {
            res.status(200).json({
                status: "ok",
                isVerified: loginUserInfo.isVerified,
                uuid: loginUserInfo.uuid,
                accessToken: loginUserInfo.accessToken,
                refreshToken: loginUserInfo.refreshToken
            })
        })
        .catch(err => {
            res.status(401).json({
                status: "error",
                error: err
            })
        })
});

/*Logout user by removing their refresh token*/
router.put('/logout', tokenMiddleware.authenticateToken, authMiddleware.authenticateLogout, async(req, res) => {
    res.status(201).json({
        status: "ok",
        message: "User logout success"
    })

})

/*Gives user a new access token upon given a good refresh token*/
router.post('/token', tokenMiddleware.authenticateRefreshToken, (req, res) => {
    let uuid = req.user.uuid;
    authentication.generateAccessToken(uuid)
        .then(newAccessToken => {
            res.status(201).json({
                status: "ok",
                accessToken: newAccessToken
            })
        })
        .catch(err => {
            res.status(401).json({
                status: "error",
                error: err
            })
        })
})

//verify email of account
router.put('/verifyAccount', tokenMiddleware.authenticateToken, authMiddleware.verifyVerificationCode, (req, res) => {
    let uuid = req.user.uuid;
    authentication.updateAccountPostVerified(uuid)
        .then(verifiedInfo => {
            res.status(200).json({
                status: "ok",
                message: "Account Verified",
                accessToken: verifiedInfo.accessToken,
                refreshToken: verifiedInfo.refreshToken
            })
        })
        .catch(err => {
            res.status(401).json({
                status: "error",
                error: err
            })
        })

})


module.exports = router;
