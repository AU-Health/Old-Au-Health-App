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
        await dbConnection.createNewUserInDB(hashedEmail, hashedPassword, isAdmin);
        let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
        let uuid = queryResult["UUID"].toString();
        return [uuid, generateAccessToken(uuid)];
    } catch (e) {
        console.log(e);
        return "error";

    } //send email
}

//login user. Returns user's UUID and JWT token
async function login(email) {
    // emailer.sendEmail("antonbaron10@gmail.com", "HELLO", "<p>HI!!!</p>");
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
    let uuid = queryResult["UUID"].toString();
    let accessToken = generateAccessToken(uuid);
    let refreshToken = await generateAndStoreRefreshToken(uuid);
    return [uuid, accessToken, refreshToken];
}


//logout uer by deleting the refresh token
async function logout(uuid) {
    let queryResult = await dbConnection.removeRefreshTokenForUser(uuid);
    return queryResult ? "error" : "ok";
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
    let refreshTokenInDB = queryResult['RefreshToken'];
    return refreshTokenInDB === refreshToken;
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
async function generateAndStoreRefreshToken(uuid) {
    let refreshToken = jwt.sign({ "uuid": uuid }, process.env.REFRESH_TOKEN_SECRET);
    dbConnection.storeRefreshTokenForUser(uuid, refreshToken, { expiresIn: '7d' });
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