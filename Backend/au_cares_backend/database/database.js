/*File will have all of the methods for database querying*/
const mysql = require('mysql');

//Create a new user in DB
function createNewUserInDB(hashedEmail, hashedPassword, isAdmin, verificationCode) {
    return new Promise((resolve, reject) => {
        const mySqlConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            // password: process.env.DB_PASS,
            database: "au_cares_db"
        });
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            let sqlQueryCreateUser = `INSERT INTO User(UserEmail,Password,UUID,UserType) VALUES ("${hashedEmail}","${hashedPassword}",UuidToBin(UUID()),${isAdmin?2:1})`;
            mySqlConnection.query(sqlQueryCreateUser, function(err, result) {
                if (err) reject(err);
                let userId = result.insertId;
                let sqlQueryAddVerificationCode = `INSERT INTO VerificationCodes(UserId,ConfirmationCode) VALUES(${userId},'${verificationCode}')`;
                mySqlConnection.query(sqlQueryAddVerificationCode, function(err, result) {
                    if (err) reject(err);
                    resolve("success");
                    mySqlConnection.end();
                })

            })
        });
    });
}

async function getUserVerificationCode(uuid) {
    let sqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT ConfirmationCode, Expiration FROM User,VerificationCodes WHERE User.UserId = VerificationCodes.UserId AND UUID = UuidToBin("${uuid}")`
    return queryViaMySqlConnection(sqlConnection, sqlQuery).then(response => {
        return response;
    })
}

function updateUserInformation(uuid, infoToUpdate, newValue, requiredVerification) {
    let sqlConnection = createMySqlConnection();
    let sqlQueryUpdate = `UPDATE USER SET ${infoToUpdate} = ${newValue} WHERE UUID=UuidToBin("${uuid}")`
    return new Promise((resolve, reject) => {
        sqlConnection.connect((err) => {
            if (err) reject(err);
            sqlConnection.query(sqlQueryUpdate, (err, result) => {
                if (err) reject(err);
                let updateResult = result;

                if (requiredVerification) {
                    let sqlQueryDeleteVerificationCode = `DELETE FROM VerificationCodes WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
                    sqlConnection.query(sqlQueryDeleteVerificationCode, (err, result) => {
                        if (err) reject(err);
                    })
                }
                resolve(updateResult);
            })
        })
    })
}

//Verify code is correct
// function verifyUserAccount(uuid, verificationCode) {
//     return new Promise((resolve, reject) => {
//         let sqlConnection = createMySqlConnection();
//         let sqlQuery = `UPDATE User SET UserVerified = TRUE WHERE User.UserId = (SELECT User.UserId FROM User,VerificationCodes WHERE User.UserId = VerificationCodes.UserId AND VerificationCodes.ConfirmationCode = '${verificationCode}' AND UUID=UuidToBin('${uuid}'))`
//         sqlConnection.connect((err) => {
//             if (err) reject(err);
//             sqlConnection.query(sqlQuery, (err, result) => {
//                 if (err) reject(err);
//                 if (result.affectedRows == 0)
//                     resolve(0);
//                 else {
//                     let sqlQuery = `DELETE FROM VerificationCodes WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
//                     sqlConnection.query(sqlQuery, (err, result) => {
//                         if (err) reject(err);
//                         console.log("QUERY 2 DONE")
//                         resolve(result);
//                     })
//                 }
//             })
//         })
//     });
// }


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
    let sqlQuery = `REPLACE INTO UserRefreshTokens SELECT UserId,"${refreshToken}" FROM User WHERE UUID=UuidToBin("${uuid}")` //worry alter about already having  key existing
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then(response => {
        return response;
    })
}

function removeRefreshTokenForUser(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `DELETE FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
    return new Promise((resolve, reject) => {
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, function(err, result, fields) {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    });
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
        user: 'root', //process.env.DB_USER,
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
                sqlConnection.end();
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
module.exports.getUserVerificationCode = getUserVerificationCode;
module.exports.updateUserInformation = updateUserInformation;