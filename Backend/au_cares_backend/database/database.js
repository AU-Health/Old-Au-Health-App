/*File will have all of the methods for database querying*/
const mysql = require('mysql');

/*Create a connection Pool*/
const sqlConnectionPool = mysql.createPool({
    connectionLimit: 10,
    user: 'root', //process.env.DB_USER,
    // password: process.env.DB_PASS,
    database: "au_cares_db"
})

//Create a new user in DB and add verification
function createNewUserInDB(hashedEmail, hashedPassword, isAdmin, verificationCode) {
    return new Promise((resolve, reject) => {
        let sqlQueryCreateUser = 'INSERT INTO User(UserEmail,Password,UUID,IsAdmin) VALUES (?,?,UuidToBin(UUID()),?)'; //add user in User table
        let sqlQueryAddVerificationCode = 'INSERT INTO VerificationCodes(UserId,ConfirmationCode) VALUES(?,?)'; //add user verification code
        let sqlQueryAddCategoryPoints = 'INSERT INTO CategoryPoints(UserId) VALUES(?)';
        sqlConnectionPool.getConnection((err, mySqlConnection) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryCreateUser, [hashedEmail, hashedPassword, isAdmin], (err, result) => {
                if (err) reject(err);
                mySqlConnection.query(sqlQueryAddCategoryPoints, [result.insertId], (err, resultAddingCategories) => { //add category min points
                    if (err) reject(err);
                    mySqlConnection.query(sqlQueryAddVerificationCode, [result.insertId, verificationCode], (err, result) => { //add verification code
                        if (err) reject(err);
                        resolve("success");
                        mySqlConnection.release();
                    })
                })
            })
        })
    });
}


function getUserVerificationCode(uuid) {
    let sqlQuery = 'SELECT ConfirmationCode, Expiration FROM User,VerificationCodes WHERE User.UserId = VerificationCodes.UserId AND UUID = UuidToBin(?)'
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}


function updateUserInformation(uuid, infoToUpdate, newValue, requiredVerification) {
    let sqlQueryUpdate = `UPDATE USER SET ${infoToUpdate} = ? WHERE UUID=UuidToBin(?)`;
    let sqlQueryDeleteVerificationCode = `DELETE FROM VerificationCodes WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
    return new Promise((resolve, reject) => {
        sqlConnectionPool.getConnection((err, mySqlConnection) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryUpdate, [newValue, uuid], (err, updateResult) => {
                if (err) reject(err);
                if (requiredVerification) {
                    mySqlConnection.query(sqlQueryDeleteVerificationCode, [uuid], (err) => {
                        if (err) reject(err);
                        resolve(updateResult);
                        mySqlConnection.release();
                    })
                }
            })
        })
    })
}

//Get User Information from user based on Email
function getUserInfoFromEmail(hashedEmail) {
    let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UserEmail=?`;
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [hashedEmail], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}

//Get user info from UUID
function getUserInfoFromUUID(uuid) {
    let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UUID=UuidToBin(?)`;
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}

function storeRefreshTokenForUser(uuid, refreshToken) {
    let sqlQuery = `REPLACE INTO UserRefreshTokens SELECT UserId,? FROM User WHERE UUID=UuidToBin(?)` //worry alter about already having  key existing
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [refreshToken, uuid], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    });

}

function removeRefreshTokenForUser(uuid) {
    let sqlQuery = `DELETE FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

}

function getUserRefreshTokenFromUUID(uuid) {
    let sqlQuery = `SELECT RefreshToken FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })


}

function addTruthToDB(truthDescription, points, cateogryId, minPoints, hoursToComplete) {
    let sqlQuery = 'INSERT INTO Truths(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [truthDescription, points, cateogryId, minPoints, hoursToComplete], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function addDareToDB(dareDescription, points, cateogryId, minPoints, hoursToComplete) {
    let sqlQuery = 'INSERT INTO Dares(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [dareDescription, points, cateogryId, minPoints, hoursToComplete], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function addQuestionToDB(questionTitle, questionDescription, points, cateogryId, minPoints, hoursToComplete) {
    let sqlQuery = 'INSERT INTO Questions(QuestionTitle, Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [questionTitle, questionDescription, points, cateogryId, minPoints, hoursToComplete], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}



function getTruthsHistory(isCurrent, isComplete, category, uuid) {
    let sqlQuery = `
    SELECT th.TruthHistoryId,th.Issued,th.Expiration, t.Description, t.Points, c.CategoryName, act.ActivityCompletedTypeName, tr.Data, UuidFromBin(User.UUID)
    FROM TruthsHistory AS th
    INNER JOIN Truths AS t ON th.TruthId = t.TruthId
    INNER JOIN categorytypes AS c ON t.CategoryId = c.CategoryId
    INNER JOIN ActivityCompletedTypes AS act ON th.Completed = act.ActivityCompletedTypeId
    INNER JOIN User ON th.UserId = User.UserId
    LEFT JOIN TruthsResponses AS tr ON th.TruthResponseId= tr.TruthResponseId
    WHERE (CASE WHEN ISNULL(?) THEN TRUE WHEN ? = TRUE THEN act.ActivityCompletedTypeId=1 ELSE act.ActivityCompletedTypeId>1 END)
    AND (User.UUID = UuidToBin(?) OR ISNULL(?))
    AND (? = c.CategoryName OR ISNULL(?))
    AND (CASE WHEN ISNULL(?) THEN TRUE WHEN ? = TRUE THEN NOW()<th.Expiration ELSE NOW()>th.Expiration END)
    `
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [isComplete, isComplete, uuid, uuid, category, category, isCurrent, isCurrent], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });

}

//TODO: FINISH UPDATE TRUTH RESPONSE
function updateTruthResponse(truthId, truthResponse) {
    let sqlQueryCreateNewTruthResponse = 'INSERT INTO TruthsResponses(Data) VALUES(?)';
    let sqlQueryAddTruthResponseId = 'UPDATE TruthsHistory SET TruthResponseId =?, Completed = 1 WHERE TruthHistoryId =?';
    return new Promise((resolve, reject) => {
        sqlConnectionPool.getConnection((err, mySqlConnection) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryCreateNewTruthResponse, [truthResponse], (err, result) => {
                if (err) reject(err);
                mySqlConnection.query(sqlQueryAddTruthResponseId, [result.insertId, truthId], (err, resultFinal) => {
                    if (err) reject(err);
                    resolve(resultFinal);
                });
            })
        })
    });
}

function getAllCategoryPoints(uuid) {
    let sqlQuery = "SELECT CategoryPoints.* FROM User,CategoryPoints WHERE CategoryPoints.UserId = User.UserId AND User.UUID = UuidToBin(?)";
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

//get 1 truth with the parameters. Also used to get a truth for a user to have
function getTruthTask(category, minPointsNeeded, isCounted) {
    let sqlQueryGetTask =
        `
    SELECT *
    FROM Truths
    INNER JOIN CategoryTypes ON Truths.CategoryId = CategoryTypes.CategoryId
    WHERE CategoryTypes.CategoryName=? AND MinPointsNeeded >=?
    ORDER BY RAND()
    LIMIT 1
    `
    let updateTruthCountSentSqlQuery =
        `
    UPDATE Truths
    SET SentNum = SentNum+1
    WHERE TruthId = ${result.TruthId}
    `

    return new Promise((resolve, reject) => {
        sqlConnectionPool.getConnection((err, mySqlConnection) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryGetTask, [category, minPointsNeeded], (err, result) => {
                if (err) reject(err);

                if (isCounted) {
                    mySqlConnection.query(updateTruthCountSentSqlQuery, (err) => {
                        if (err) reject(err);
                    });
                }
                resolve(result);
                mySqlConnection.release();
            });
        })
    })
}

//assigns user new task. Things for multiple choice and dropdown will be in separate query
function assignUserNewTruthTask(uuid, truthId) {
    let sqlQuery = `INSERT INTO TruthsHistory(UserId,TruthId,Expiration)
    SELECT (SELECT UserId FROM User WHERE User.UUID=UuidToBin(?)),?,(SELECT NOW() + INTERVAL Truths.HoursToComplete HOUR FROM Truths WHERE TruthId =?)`;
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [uuid, truthId, truthId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function postFeedback(subject, feedback) {
    let sqlQuery = 'INSERT INTO ApplicationFeedback(Subject,Feedback) VALUES ("?","?")'
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [subject, feedback], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

async function getResources(specificResource) {
    let sqlQuery = 'SELECT * FROM Resources WHERE (CASE WHEN ISNULL(?)THEN TRUE ELSE Name=? END)'
    return new Promise((resolve, reject) => {
        sqlConnectionPool.query(sqlQuery, [specificResource, specificResource], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports.createNewUserInDB = createNewUserInDB;
module.exports.getUserInfoFromEmail = getUserInfoFromEmail;
module.exports.storeRefreshTokenForUser = storeRefreshTokenForUser;
module.exports.getUserRefreshTokenFromUUID = getUserRefreshTokenFromUUID;
module.exports.getUserInfoFromUUID = getUserInfoFromUUID;
module.exports.removeRefreshTokenForUser = removeRefreshTokenForUser;
module.exports.getUserVerificationCode = getUserVerificationCode;
module.exports.updateUserInformation = updateUserInformation;
module.exports.postFeedback = postFeedback;
module.exports.getTruthsHistory = getTruthsHistory;
module.exports.addTruthToDB = addTruthToDB;
module.exports.updateTruthResponse = updateTruthResponse;
module.exports.getAllCategoryPoints = getAllCategoryPoints;
module.exports.addDareToDB = addDareToDB;
module.exports.addQuestionToDB = addQuestionToDB;
module.exports.assignUserNewTruthTask = assignUserNewTruthTask;
module.exports.getTruthTask = getTruthTask;
module.exports.getResources = getResources;