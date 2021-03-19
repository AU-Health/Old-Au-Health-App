/*File will have all of the methods for database querying*/
const mysql = require('mysql');

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
            console.log("Connected!");
            let sqlQuery = `INSERT INTO User(UserEmail,Password,UUID,UserType) VALUES ("${hashedEmail}","${hashedPassword}",UuidToBin(UUID()),${isAdmin?2:1})`;
            mySqlConnection.query(sqlQuery, function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                resolve("success");
            });
        });
    });
}

function getUserInfoFromEmail(hashedEmail) {
    console.log("HASHED EMAIL IS " + hashedEmail);
    return new Promise((resolve, reject) => {
        const mySqlConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            // password: process.env.DB_PASS,
            database: "au_cares_db"
        });
        mySqlConnection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            let sqlQuery = `SELECT UuidFromBin(UUID) UUID,UserType,UserVerified,ConsentFormSigned,UserAccountDisabled FROM User WHERE UserEmail='${hashedEmail}'`;
            mySqlConnection.query(sqlQuery, function(err, result, fields) {
                if (err) reject(error);

                resolve(result[0]);
            });
        });
    });
}

module.exports.createNewUserInDB = createNewUserInDB;
module.exports.getUserInfoFromEmail = getUserInfoFromEmail;