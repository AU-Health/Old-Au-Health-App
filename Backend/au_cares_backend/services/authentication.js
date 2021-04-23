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
        let queryResult = await getUserInformationFromEmail(hashedEmail, true);
        let uuid = queryResult["UuidFromBin(UUID)"].toString();
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

async function getUserVerificationCode(uuid) {
    return await dbConnection.getUserVerificationCode(uuid);
}


//service of what to do once we are aware account is verified
async function updateAccountPostVerified(uuid) {
    await dbConnection.updateUserInformation(uuid, "UserVerified", true, true);
    //maybe send email saying user is now verified

    return {
        accessToken: await generateAccessToken(uuid),
        refreshToken: generateAndStoreRefreshToken(uuid)
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
    let queryResult = await dbConnection.getUserRefreshTokenFromUUID(uuid);
    return queryResult && queryResult['RefreshToken'] === refreshToken;
}

//methods to change password, email, or other things

//create a new JWT for the user --- maybe add points per category?
async function generateAccessToken(uuid) {
    return dbConnection.getUserInfoFromUUID(uuid).then(response => {
            let jwtPayload = {};
            jwtPayload["uuid"] = response["UuidFromBin(UUID)"].toString();
            jwtPayload["userType"] = response.userType;
            jwtPayload["isAdmin"] = !!response.IsAdmin;
            jwtPayload["isVerified"] = response.UserVerified;
            jwtPayload["consentSigned"] = response.ConsentFormSigned;
            jwtPayload["isAccountDisabled"] = response.UserAccountDisabled;
            return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
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
module.exports.updateAccountPostVerified = updateAccountPostVerified;
module.exports.getUserInformationFromEmail = getUserInformationFromEmail;
module.exports.getUserVerificationCode = getUserVerificationCode;