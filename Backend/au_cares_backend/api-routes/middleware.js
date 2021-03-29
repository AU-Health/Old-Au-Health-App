//MIDDLEWARE methods
const authentication = require("../services/authentication");

//Ensure email and password are valid to create a new account
async function ensureEmailAndPass(req, res, next) {
    let jsonError = { status: "error" }
    let email = req.body.email;
    let password = req.body.password;
    if (!(email.length >= 14 && email.match(/[a-z0-9]+@(student.)?american.edu$/))) {
        jsonError["error"] = "Email not AU"
        res.status(401).json(jsonError);
        return;
    }
    //check if email already exists in the system
    if (await authentication.accountExists(email)) {
        jsonError["error"] = "Account under email already exists"
        res.status(401).json(jsonError);
        return;
    }

    if (!(password.length >= 8)) {
        jsonError["error"] = "Password too short";
        res.status(401).json(jsonError);
        return;
    }
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countNonChars = 0;
    for (let i = 0; i < password.length; i++) {
        let currentChar = password[i];
        if (isLetter(currentChar)) //if letter
        {
            isUpperCase(currentChar) ? countUpperCase++ : countLowerCase++;
        } else {
            countNonChars++;
        }
    }
    if (!countUpperCase >= 1) {
        jsonError["error"] = "Not enough capital letters. Need at least 1 uppercase";
        res.status(401).json(jsonError);
        return;
    }
    if (!countLowerCase >= 1) {
        jsonError["error"] = "Not enough lowercase letters. Need at least 1 lowercase";
        res.status(401).json(jsonError);
        return;
    }
    if (!countNonChars >= 1) {
        jsonError["error"] = "Not enough non-characters. Need at least 1";
        res.status(401).json(jsonError);
        return;
    }
    next();

    function isUpperCase(letter) {
        return letter === letter.toUpperCase();
    }

    function isLetter(letter) {
        let charCode = letter.charCodeAt(0);
        return (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122);
    }
}

//Authenticate user account, ensuring account is correct
async function authenticateUserAccount(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (!await authentication.accountExists(email)) {
        res.status(401).json({
            status: "error",
            error: "Account with email does not exist"
        });
        return;
    }
    let isPasswordCorrect = await authentication.isPasswordCorrectForAccount(email, password);
    if (!isPasswordCorrect) {
        res.status(403).json({
            status: "error",
            error: "Incorrect password"
        })
        return;
    }
    next();
};

module.exports.ensureEmailAndPass = ensureEmailAndPass;
module.exports.authenticateUserAccount = authenticateUserAccount;