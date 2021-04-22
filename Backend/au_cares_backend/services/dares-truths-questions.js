const dbConnection = require('../database/database');


async function getTruthsHistory(isCurrent, isComplete, category, uuid) {

    return dbConnection.getTruthsHistory(isCurrent, isComplete, category, uuid).then(result => {
        let truthArr = [];

        for (let truthObject of result) {
            truthObject["uuid"] = truthObject["UuidFromBin(User.UUID)"].toString();
            delete truthObject["UuidFromBin(User.UUID)"];
            truthArr.push(truthObject);
        }
        return truthArr;
    })
}

//add a new truth to the database
async function createTruth(truthDescription, points, categoryId, minPoints, hoursToComplete) {
    return dbConnection.addTruthToDB(truthDescription, points, categoryId, minPoints, hoursToComplete).then(result => {
        return result.affectedRows > 0;
    })
}

<<<<<<< HEAD
async function addTruthResponse(truthId, response) {
    return dbConnection.updateTruthResponse(truthId, response).then(result => {
        return result.affectedRows > 0;
    })
}

async function getTask(uuid, taskType, category) {
    let currentCategoryPoints = await dbConnection.getAllCategoryPoints(uuid);
    console.log(currentCategoryPoints);

    /*
=======
async function createDare(dareDescription, points, categoryId, minPoints, hoursToComplete) {
    return dbConnection.addDareToDB(dareDescription, points, categoryId, minPoints, hoursToComplete).then(result => {
        return result.affectedRows > 0;
    })
}

async function createQuestion(questionTitle, questionDescription, points, categoryId, minPoints, hoursToComplete) {
    return dbConnection.addQuestionToDB(questionTitle, questionDescription, points, categoryId, minPoints, hoursToComplete).then(result => {
        return result.affectedRows > 0;
    })
}
>>>>>>> 02226b0870dcbb90aeda1722777b421ca5f39f84


UPDATE Truths
SET SentNum = SentNum+1
WHERE TruthId = EXISTS (SELECT TruthId
FROM Truths
WHERE CategoryId =5 AND MinPointsNeeded >=20
ORDER BY RAND()
LIMIT 1)
    */
}

module.exports.getTruthsHistory = getTruthsHistory;
module.exports.createTruth = createTruth;
<<<<<<< HEAD
module.exports.addTruthResponse = addTruthResponse;
module.exports.getTask = getTask;
=======
module.exports.createDare = createDare;
module.exports.createQuestion = createQuestion;
>>>>>>> 02226b0870dcbb90aeda1722777b421ca5f39f84
