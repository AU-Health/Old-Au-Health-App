/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');
const authMiddleware = require("../middleware/auth-middleware");
const tokenMiddleware = require('../middleware/token-middleware');

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server


/*Create a new user*/
router.post('/user_create', authMiddleware.ensureEmailAndPass, async(req, res) => {
    let userEmail = req.body.email;
    let userPass = req.body.password;
    let isAdmin = req.body.isAdmin;
    let createdUserInfo = await authentication.createUserAccount(userEmail, userPass, isAdmin);
    res.status(200).json({
        status: "ok",
        uuid: createdUserInfo.uuid,
        access_token: createdUserInfo.accessToken
    });
});

/*Login a user*/
router.post('/login', authMiddleware.authenticateUserAccount, async(req, res) => {
    let uuid = req.user.uuid;
    let isVerified = req.user.isVerified;
    let loginUserInfo = await authentication.login(uuid, isVerified);

    res.status(200).json({
        status: "ok",
        isVerified: loginUserInfo.isVerified,
        uuid: loginUserInfo.uuid,
        access_token: loginUserInfo.accessToken,
        refresh_token: loginUserInfo.refreshToken
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
router.post('/token', tokenMiddleware.authenticateRefreshToken, async(req, res) => {
    let uuid = req.user.uuid;
    let newAccessToken = await authentication.generateAccessToken(uuid);

    res.status(201).json({
        status: "ok",
        access_token: newAccessToken
    })


})

//verify email of account
router.put('/verifyAccount', tokenMiddleware.authenticateToken, authMiddleware.verifyVerificationCode, async(req, res) => {
    let uuid = req.user.uuid;
    let verifiedInfo = await authentication.updateAccountPostVerified(uuid);
    res.status(200).json({
        status: "ok",
        message: "Account Verified",
        access_token: verifiedInfo.accessToken,
        refresh_token: verifiedInfo.refreshToken
    })
})


module.exports = router;