/*File will have all of the methods for database querying*/
const { response } = require('express');
const mysql = require('mysql');

//Create a new user in DB
function createNewUserInDB(hashedEmail, hashedPassword, isAdmin) {
    return new Promise((resolve, reject) => {
        const mySqlConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            // password: process.env.DB_PASS,
            database: "au_cares_db"
        });
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            let sqlQuery = `INSERT INTO User(UserEmail,Password,UUID,UserType) VALUES ("${hashedEmail}","${hashedPassword}",UuidToBin(UUID()),${isAdmin?2:1})`;
            mySqlConnection.query(sqlQuery, function(err, result) {
                if (err) throw err;
                resolve("success");
            });
        });
    });
}

//Get User Information from user based on Email
function getUserInfoFromEmail(hashedEmail) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT UuidFromBin(UUID) UUID,UserType,UserVerified,ConsentFormSigned,UserAccountDisabled FROM User WHERE UserEmail='${hashedEmail}'`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Get user info from UUID
function getUserInfoFromUUID(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT * FROM User WHERE UUID=UuidToBin('${uuid}')`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}


function getUserHashedPasswordFromEmail(hashedEmail) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT Password FROM User WHERE UserEmail = '${hashedEmail}'`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

function storeRefreshTokenForUser(uuid, refreshToken) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO UserRefreshTokens SELECT UserId,"${refreshToken}" FROM User WHERE UUID=UuidToBin("${uuid}")` //worry alter about already having  key existing
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then(response => {
        return response;
    })
}

function removeRefreshTokenForUser(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `DELETE FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((response, reject) => {
        return response;
    })
}

function getUserRefreshTokenFromUUID(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT RefreshToken FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((response => {
        return response;
    }))

}




/**************************Shortcuts to create connection************/
function createMySqlConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        // password: process.env.DB_PASS,
        database: "au_cares_db"
    });
}

function queryViaMySqlConnection(sqlConnection, sqlQuery) {
    return new Promise((resolve, reject) => {
        sqlConnection.connect(function(err) {
            if (err) reject(err);
            sqlConnection.query(sqlQuery, function(err, result, fields) {
                if (err) reject(err);
                else if (!result[0]) resolve(undefined)
                else resolve(result[0]);
            });
        });
    });
}

module.exports.createNewUserInDB = createNewUserInDB;
module.exports.getUserInfoFromEmail = getUserInfoFromEmail;
module.exports.getUserHashedPasswordFromEmail = getUserHashedPasswordFromEmail;
module.exports.storeRefreshTokenForUser = storeRefreshTokenForUser;
module.exports.getUserRefreshTokenFromUUID = getUserRefreshTokenFromUUID;
module.exports.getUserInfoFromUUID = getUserInfoFromUUID;
module.exports.removeRefreshTokenForUser = removeRefreshTokenForUser;