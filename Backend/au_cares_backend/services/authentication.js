/*File will have all authentication related things here*/
const dbConnection = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailer = require('./emailer');

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
        return {
            uuid: uuid,
            accessToken: await generateAccessToken(uuid)
        }
    } catch (e) {
        console.log(e);
        return "error";

    }
}

//login user. Returns user's UUID and JWT token
async function login(uuid, isVerified) {
    let accessToken = await generateAccessToken(uuid);
    let refreshToken = null;

    if (isVerified) {
        refreshToken = generateAndStoreRefreshToken(uuid);
    }

    return {
        uuid: uuid,
        isVerified: !!isVerified,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}


//logout user by deleting the refresh token ... returns undefined if error, otherwise num rows deletd
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

//get user information from UUID
async function getUserInformationFromUUID(uuid) {
    return await dbConnection.getUserRefreshTokenFromUUID(uuid);
}

//get user information from email
async function getUserInformationFromEmail(email, isHashed) {
    if (!isHashed) {
        const hashAlgo = crypto.createHash('sha256');
        email = hashAlgo.update(email).digest('hex');
    }
    return await dbConnection.getUserInfoFromEmail(email);
}

async function isRefreshTokenCorrectForAccount(uuid, refreshToken) {
    return queryResult && queryResult['RefreshToken'] === refreshToken;
}

//methods to change password, email, or other things

//create a new JWT for the user --- maybe add points per category?
async function generateAccessToken(uuid) {
    return dbConnection.getUserInfoFromUUID(uuid).then(response => {
            let jwtPayload = {};
            jwtPayload["binaryUuid"] = response["UuidFromBin(UUID)"];
            jwtPayload["userType"] = response.userType;
            jwtPayload["isVerified"] = response.UserVerified;
            jwtPayload["consentSigned"] = response.ConsentFormSigned;
            jwtPayload["isAccountDisabled"] = response.UserAccountDisabled;
            return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        })
        .catch(err => {
            console.log("ERROR");
            console.log(err);
        })
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
module.exports.generateAccessToken = generateAccessToken;
module.exports.isRefreshTokenCorrectForAccount = isRefreshTokenCorrectForAccount;
module.exports.verifyUserAccount = verifyUserAccount;
module.exports.getUserInformationFromEmail = getUserInformationFromEmail;