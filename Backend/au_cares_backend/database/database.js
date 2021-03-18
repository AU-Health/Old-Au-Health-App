/*File will have all of the methods for database querying*/
const mysql = require('mysql');

function createNewUserInDB(hashedEmail, hashedPassword) {
    const mySqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "User"
    });
    mySqlConnection.connect((err) => {
        if (err) throw error;
        let sqlQuery = `INSERT INTO User (UserEmail,Password,PasswordSalt,AccountCreateDate,LastLoginDate,UserType,UserVerified,ConsentFormSigned,UserAccountDisabled) VALUES(${hashedEmail},${hashedPassword},50,${Date.now()},${Date.now()},1,1,1,1)`
    })
}

module.exports.createNewUserInDB = createNewUserInDB;