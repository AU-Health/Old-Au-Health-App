/*File will have all authentication related things here*/
const dbConnection = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailer = require('./emailer');


async function getUserUUID(email) {
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    return await dbConnection.getUserUUID(hashedEmail);
}


//method to create an account
async function createUserAccount(email, password, isAdmin) {
    try {
        const hashAlgo = crypto.createHash('sha256');
        const hashedEmail = hashAlgo.update(email).digest('hex');
        const passwordSalt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, passwordSalt); //hashes with salt
        const verificationCode = '123';

        await dbConnection.createNewUserInDB(hashedEmail, hashedPassword, isAdmin, verificationCode);
        let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
        let uuid = queryResult["UUID"].toString();
        return [uuid, generateAccessToken(uuid)];
    } catch (e) {
        console.log(e);
        return "error";

    }
}

//login user. Returns user's UUID and JWT token
async function login(email) {
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
    let uuid = queryResult["UUID"].toString();
    let isVerified = queryResult["UserVerified"];
    let accessToken = generateAccessToken(uuid);
    let refreshToken = null;

    if (isVerified) {
        refreshToken = generateAndStoreRefreshToken(uuid);
    }
    return [uuid, !!isVerified, accessToken, refreshToken];
}


//logout uer by deleting the refresh token ... returns undefined if error, otherwise num rows deletd
async function logout(uuid) {
    let queryResult = await dbConnection.removeRefreshTokenForUser(uuid);
    if (!queryResult) {
        return undefined;
    }
    return queryResult.affectedRows;
}

//verify account
async function verifyUserAccount(uuid, verificationCode) {
    let queryResult = await dbConnection.getUserVerificationCode(uuid);
    if (!queryResult) {
        return [false, "No verification code or account has already been verified", null];
    }

    let error = "";
    let verificationCodeFromDB = queryResult["ConfirmationCode"];
    let expirationDate = queryResult["expiration"];

    if (expirationDate && expirationDate < Date.now())
        error = "Expiration date expired"
    else if (verificationCode != verificationCodeFromDB)
        error = "Incorrect verification code"

    if (error == "") {
        dbConnection.updateUserInformation(uuid, "UserVerified", true, true);
        return [true, "Account Verified", generateAndStoreRefreshToken(uuid)];
    } else {
        return [false, error, null];
    }
}



async function accountExists(info, parameter) {
    if (parameter === "email") {
        const hashAlgo = crypto.createHash('sha256');
        const hashedEmail = hashAlgo.update(info).digest('hex');
        return await dbConnection.getUserInfoFromEmail(hashedEmail) !== undefined;
    } else if (parameter === "UUID") {
        return await dbConnection.getUserInfoFromUUID(info) !== undefined;
    }

}


//returns whether a password is correct for an account
async function isPasswordCorrectForAccount(email, password) {
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await dbConnection.getUserHashedPasswordFromEmail(hashedEmail);
    let hashedPassword = queryResult["Password"];
    return bcrypt.compare(password, hashedPassword).then(response => {
        return response;
    })

}

async function isRefreshTokenCorrectForAccount(uuid, refreshToken) {
    let queryResult = await dbConnection.getUserRefreshTokenFromUUID(uuid);
    return queryResult && queryResult['RefreshToken'] === refreshToken;
}

//methods to change password, email, or other things

//create a new JWT for the user
function generateAccessToken(uuid) {
    let jwtPayload = {};
    jwtPayload["uuid"] = uuid;
    // jwtPayload["userType"] = isAdmin ? 2 : 1;
    // jwtPayload["isVerified"] = false;
    // jwtPayload["isConsent"] = false;
    // jwtPayload["isAccountDisabled"] = false;
    return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

//create a refresh token for user
function generateAndStoreRefreshToken(uuid) {
    let refreshToken = jwt.sign({ "uuid": uuid }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    dbConnection.storeRefreshTokenForUser(uuid, refreshToken);
    return refreshToken;
}


//exporting functions
module.exports.login = login;
module.exports.logout = logout;
module.exports.createUserAccount = createUserAccount;
module.exports.getUserUUID = getUserUUID;
module.exports.accountExists = accountExists;
module.exports.generateAccessToken = generateAccessToken;
module.exports.isPasswordCorrectForAccount = isPasswordCorrectForAccount;
module.exports.isRefreshTokenCorrectForAccount = isRefreshTokenCorrectForAccount;
module.exports.verifyUserAccount = verifyUserAccount;