/*File will have all authentication related things here*/
const dbConnection = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const hashAlgo = crypto.createHash('sha256');


//method to create an account
async function createUserAccount(email, password, isAdmin) {
    try {
        const hashedEmail = hashAlgo.update(email).digest('hex');
        const passwordSalt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, passwordSalt); //hashes with salt
        await dbConnection.createNewUserInDB(hashedEmail, hashedPassword, isAdmin);
        let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
        let uuid = queryResult["UUID"].toString();
        return createNewJwt(uuid);
    } catch {
        console.log("error");
        return "error";

    } //send email
}
async function login(email) {
    const hashedEmail = hashAlgo.update(email).digest('hex');
    let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
    let uuid = queryResult["UUID"].toString();
    return createNewJwt(uuid);
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


//exporting functions
module.exports.login = login;
module.exports.createUserAccount = createUserAccount;
