/*File will have all of the methods for database querying*/

const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});
mySqlConnection.connect((err) => {
    if (err) throw error;
})