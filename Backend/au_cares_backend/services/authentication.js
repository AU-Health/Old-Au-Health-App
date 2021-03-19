/*File will have all authentication related things here*/
const dbConnection = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { log } = require('util');
const { resolve } = require('path');
const { rejects } = require('assert');
const hashAlgo = crypto.createHash('sha256');


//method to create an account
async function createUserAccount(email, password, isAdmin) {
    try {
        const hashedEmail = hashAlgo.update(email).digest('hex');
        const passwordSalt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, passwordSalt); //hashes with salt
        await dbConnection.createNewUserInDB(hashedEmail, hashedPassword, isAdmin);

        let queryResult = await dbConnection.getUserInfoFromEmail(hashedEmail);
        let UUID = queryResult["UUID"].toString();
        let newJwt = jwt.sign({ foo: 'bar' }, 'shhhhh');
        return newJwt;
    } catch {
        console.log("error");
        reject("error");

    } //send email
}

//method to sign in

function login() {
    //login the user
}
//methods to change password, email, or other things


//exporting functions
module.exports.login = login;
module.exports.createUserAccount = createUserAccount;