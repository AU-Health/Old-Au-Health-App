/*File will have all authentication related things here*/
const dbConnection = require('../database/database');


//method to create an account
function createUserAccount(email, pass) {
    dbConnection.createNewUserInDB(email, pass);
    //send email

}

//method to sign in

function login() {
    //login the user
}
//methods to change password, email, or other things


//exporting functions
module.exports.login = login;
module.exports.createUserAccount = createUserAccount;