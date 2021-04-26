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
        const mySqlConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            // password: process.env.DB_PASS,
            database: "au_cares_db"
        });
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            let sqlQueryCreateUser = 'INSERT INTO User(UserEmail,Password,UUID,IsAdmin) VALUES (?,?,UuidToBin(UUID()),?)'; //add user in User table
            let sqlQueryAddVerificationCode = 'INSERT INTO VerificationCodes(UserId,ConfirmationCode) VALUES(?,?)'; //add user verification code
            let sqlQueryAddCategoryPoints = 'INSERT INTO CategoryPoints(UserId) VALUES(?)';
            mySqlConnection.query(sqlQueryCreateUser, [hashedEmail, hashedPassword, isAdmin], function(err, result) {
                if (err) reject(err);
                mySqlConnection.query(sqlQueryAddCategoryPoints, [result.insertId], (err, resultAddingCategories) => { //add category min points
                    if (err) reject(err);
                    mySqlConnection.query(sqlQueryAddVerificationCode, [result.insertId, verificationCode], function(err, result) { //add verification code
                        if (err) reject(err);
                        resolve("success");
                        mySqlConnection.end();
                    })
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

function addTruthToDB(truthDescription, points, cateogryId, minPoints, hoursToComplete) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = 'INSERT INTO Truths(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, [truthDescription, points, cateogryId, minPoints, hoursToComplete], function(err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    })

}

function addDareToDB(dareDescription, points, cateogryId, minPoints, hoursToComplete) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = 'INSERT INTO Dares(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, [dareDescription, points, cateogryId, minPoints, hoursToComplete], function(err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    })

}

function addQuestionToDB(questionTitle, questionDescription, points, cateogryId, minPoints, hoursToComplete) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = 'INSERT INTO Questions(QuestionTitle, Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        mySqlConnection.connect(function(err) {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, [questionTitle, questionDescription, points, cateogryId, minPoints, hoursToComplete], function(err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    })

}


//TODO: Need to fix with string variables being null
async function getTruthsHistory(isCurrent, isComplete, category, uuid) {
    isCurrent = isCurrent || isCurrent === false ? isCurrent : null;
    isComplete = isComplete || isComplete === false ? isComplete : null;
    category = category ? category : null;
    uuid = uuid ? uuid : null;

    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `
    SELECT th.TruthHistoryId,th.Issued,th.Expiration, t.Description, t.Points, c.CategoryName, act.ActivityCompletedTypeName, tr.Data, UuidFromBin(User.UUID)
    FROM TruthsHistory AS th
    INNER JOIN Truths AS t ON th.TruthId = t.TruthId
    INNER JOIN categorytypes AS c ON t.CategoryId = c.CategoryId
    INNER JOIN ActivityCompletedTypes AS act ON th.Completed = act.ActivityCompletedTypeId
    INNER JOIN User ON th.UserId = User.UserId
    LEFT JOIN TruthsResponses AS tr ON th.TruthResponseId= tr.TruthResponseId
    WHERE (CASE WHEN ${isComplete} IS NULL THEN TRUE WHEN ${isComplete} = TRUE THEN act.ActivityCompletedTypeId=1 ELSE act.ActivityCompletedTypeId>1 END)
    AND (User.UUID = UuidToBin("${uuid}") OR "${uuid}" = "null")
    AND (${category} = c.CategoryName OR "${category}" = "null")
    AND (CASE WHEN ${isCurrent} IS NULL THEN TRUE WHEN ${isCurrent} = TRUE THEN NOW()<th.Expiration ELSE NOW()>th.Expiration END)
    ` //+ mySqlConnection.escape(isCurrent) + mySqlConnection.escape(category) + mySqlConnection.escape(uuid);

    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    });

}

//TODO: FINISH UPDATE TRUTH RESPONSE
function updateTruthResponse(truthId, truthResponse) {
    let mySqlConnection = createMySqlConnection();
    let sqlQueryCreateNewTruthResponse = 'INSERT INTO TruthsResponses(Data) VALUES(?)';
    let sqlQueryAddTruthResponseId = 'UPDATE TruthsHistory SET TruthResponseId =?, Completed = 1 WHERE TruthHistoryId =?';

    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryCreateNewTruthResponse, [truthResponse], (err, result) => {
                if (err) reject(err);

                mySqlConnection.query(sqlQueryAddTruthResponseId, [result.insertId, truthId], (err, resultFinal) => {
                    if (err) reject(err);
                    resolve(resultFinal);
                })

            })
        })
    })
}

function getAllCategoryPoints(uuid) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = "SELECT CategoryPoints.* FROM User,CategoryPoints WHERE CategoryPoints.UserId = User.UserId AND User.UUID = UuidToBin(?)";
    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err)
            mySqlConnection.query(sqlQuery, [uuid], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
}

//get 1 truth with the parameters. Also used to get a truth for a user to have
function getTruthTask(category, minPointsNeeded, isCounted) {
    let mySqlConnection = createMySqlConnection();
    let sqlQueryGetTask =
        `
    SELECT *
    FROM Truths
    INNER JOIN CategoryTypes ON Truths.CategoryId = CategoryTypes.CategoryId
    WHERE CategoryTypes.CategoryName=? AND MinPointsNeeded >=?
    ORDER BY RAND()
    LIMIT 1
    `
    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQueryGetTask, [category, minPointsNeeded], (err, result) => {
                if (err) reject(err);

                if (isCounted) {
                    let updateTruthCountSentSqlQuery =
                        `
                    UPDATE Truths
                    SET SentNum = SentNum+1
                    WHERE TruthId = ${result.TruthId}
                    `
                    mySqlConnection.query(updateTruthCountSentSqlQuery, (err) => {
                        if (err) reject(err);
                    })
                }
                resolve(result);
            })
        })
    })
}

//assigns user new task. Things for multiple choice and dropdown will be in separate query
function assignUserNewTruthTask(uuid, truthId) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = `INSERT INTO TruthsHistory(UserId,TruthId,Expiration)
    SELECT (SELECT UserId FROM User WHERE User.UUID=UuidToBin(?)),?,(SELECT NOW() + INTERVAL Truths.HoursToComplete HOUR FROM Truths WHERE TruthId =?)
    `;

    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, [uuid, truthId, truthId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
}

async function postFeedback(subject, feedback) {
    let mySqlConnection = createMySqlConnection();
    let sqlQuery = 'INSERT INTO ApplicationFeedback(Subject,Feedback) VALUES ("?","?")'
    return new Promise((resolve, reject) => {
        mySqlConnection.connect((err) => {
            if (err) reject(err);
            mySqlConnection.query(sqlQuery, [subject, feedback], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
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