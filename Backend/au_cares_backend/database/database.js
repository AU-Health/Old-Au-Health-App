/*File will have all of the methods for database querying*/
const mysql = require('mysql');

//Create a new user in DB and add verification
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
            let sqlQueryCreateUser = 'INSERT INTO User(UserEmail,Password,UUID,IsAdmin) VALUES (?,?,UuidToBin(UUID()),?)';
            mySqlConnection.query(sqlQueryCreateUser, [hashedEmail, hashedPassword, isAdmin], function(err, result) {
                if (err) reject(err);
                let userId = result.insertId;
                let sqlQueryAddVerificationCode = 'INSERT INTO VerificationCodes(UserId,ConfirmationCode) VALUES(?,?)';
                mySqlConnection.query(sqlQueryAddVerificationCode, [userId, verificationCode], function(err, result) {
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

//Get User Information from user based on Email
function getUserInfoFromEmail(hashedEmail) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UserEmail='${hashedEmail}'`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Get user info from UUID
function getUserInfoFromUUID(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UUID=UuidToBin('${uuid}')`;
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

async function getUserRefreshTokenFromUUID(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `SELECT RefreshToken FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin("${uuid}"))`
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((response => {
        return response;
    }))

}

//Insert Dares into table
function createDare() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Dares(Dare, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Dare", 5, 5, 2, 2)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Insert Truths into table
function createTruths() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Truths(Truth, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Truth", 1, 2, 3, 4)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

//Insert Questions into table
function createQuestions() {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO Questions(QuestionTitle, Question, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES ("Questions", "What is your name?", 2, 1, 10, 2)`;
    return queryViaMySqlConnection(mySqlConnection, sqlQuery).then((resolve, reject) => {
        return resolve;
    })
}

async function getTruthsHistory(isCurrent, topic, uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = "SELECT truthshistory.* FROM User,TruthsHistory"

    if (isCurrent || topic || uuid) {
        sqlQuery = +" WHERE "
    }

}

async function postFeedback(subject, feedback) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO ApplicationFeedback(Subject,Feedback) VALUES ("${subject}","${feedback}")`
    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
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
module.exports.storeRefreshTokenForUser = storeRefreshTokenForUser;
module.exports.getUserRefreshTokenFromUUID = getUserRefreshTokenFromUUID;
module.exports.getUserInfoFromUUID = getUserInfoFromUUID;
module.exports.removeRefreshTokenForUser = removeRefreshTokenForUser;
module.exports.createDare = createDare;
module.exports.createTruths = createTruths;
module.exports.createQuestions = createQuestions;
module.exports.getUserVerificationCode = getUserVerificationCode;
module.exports.updateUserInformation = updateUserInformation;
module.exports.postFeedback = postFeedback;