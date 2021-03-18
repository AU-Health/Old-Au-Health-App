/*File will have all of the authentication routes*/
const authentication = require('../services/authentication');

//this will be the class for the routes
const express = require("express"); //import express
const router = express.Router(); //used to set up an express server

//Test status of server
router.get('/ping', (req, res) => {
    res.status(200).send("pong");
})

router.post('/createAccount', (req, res) => {
    let userEmail = req.body.email;
    if (userEmail.substr(userEmail.length - 21) === "@student.american.edu") {
        let userPass = req.body.password;
        authentication.createUserAccount(userEmail, userPass);
    } else {
        res.status(401).send("Email not AU");
    }

});



//middleware

function ensureEmail(req, res, next) {
    //ensure email is a student.american email
    //ensure doesnt exist in the db
}


router.post('/login', (req, res) => {
    authentication.login();
});


module.exports = router;