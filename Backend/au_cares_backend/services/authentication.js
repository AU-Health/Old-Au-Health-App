/*File will have all authentication related things here*/


//method to create an account
function createUserAccount(email, pass) {
    createNewUserInDB(email, pass);
    //send email

}

//method to sign in

function login() {
    //login the user
}
//methods to change password, email, or other things


//authorize all coming in traffic to ensure user integrity
function authorization(req, res, next) {

}


//exporting functions
module.exports.login = login;
module.exports.createUserAccount = createUserAccount;