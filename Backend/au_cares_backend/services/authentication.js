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
        return [uuid, createNewJwt(uuid)];
    } catch (e) {
        console.log(e);
        return "error";

    } //send email
}

//login user. Returns user's UUID and JWT token
async function login(email) {
    emailer.sendEmail("antonbaron10@gmail.com", "HELLO", "<p>HI!!!</p>");
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
    let uuid = queryResult["UUID"].toString();
    return [uuid, createNewJwt(uuid)];
}

async function accountExists(email) {
    const hashAlgo = crypto.createHash('sha256');
    const hashedEmail = hashAlgo.update(email).digest('hex');
    return await dbConnection.getUserInfoFromEmail(hashedEmail) !== undefined;
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

//methods to change password, email, or other things

//create a new JWT for the user
function createNewJwt(uuid) {
    let jwtPayload = {};
    jwtPayload["uuid"] = uuid;
    // jwtPayload["userType"] = isAdmin ? 2 : 1;
    // jwtPayload["isVerified"] = false;
    // jwtPayload["isConsent"] = false;
    // jwtPayload["isAccountDisabled"] = false;
    return jwt.sign(jwtPayload, 'shhhhh', { expiresIn: '30m' });
}

function createVerificationCode() {
    let values = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*?/"
    let verificationCode = "";
    for (let i = 0; i < 8; i++) {
        let randomCharVal = parseInt(Math.random() * values.length);
        verificationCode += values.charAt(randomCharVal);
    }
    return verificationCode;
}

//function will be used to verify whether user verification code is correct
function verifyUserAccount(uuid, verificationCode) {

}


//exporting functions
module.exports.login = login;
module.exports.createUserAccount = createUserAccount;
module.exports.getUserUUID = getUserUUID;
module.exports.accountExists = accountExists;
module.exports.isPasswordCorrectForAccount = isPasswordCorrectForAccount;