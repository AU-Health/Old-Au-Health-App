/*File will have all of the methods for database querying*/
const mysql = require('mysql');

function createNewUserInDB(hashedEmail, hashedPassword) {
    const mySqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "au_cares_db"
    });
    mySqlConnection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sqlQuery = `INSERT INTO User(UserEmail,Password,PasswordSalt,UUID) VALUES ("${hashedEmail}","${hashedPassword}","${hashedPassword.substr(1)}",UuidToBin(UUID()))`;
        mySqlConnection.query(sqlQuery, function(err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}

module.exports.createNewUserInDB = createNewUserInDB;