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

async function addTruthResponse(truthId, response) {
    return dbConnection.updateTruthResponse(truthId, response).then(result => {
        return result.affectedRows > 0;
    })
}

async function getTask(uuid, taskType, category) { //currently assuming we are only doing truth types
    let currentCategoryPoints = await dbConnection.getAllCategoryPoints(uuid);
    let minPointsOfCategory = currentCategoryPoints[0][category + "Points"];
    let getNewTask = await dbConnection.getTruthTask(category, minPointsOfCategory, false);
    let truthInsertedQueryResult = await dbConnection.assignUserNewTruthTask(uuid, getNewTask[0].TruthId);

    return truthInsertedQueryResult.affectedRows > 0 ? getNewTask : "";
}


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

module.exports.getTruthsHistory = getTruthsHistory;
module.exports.createTruth = createTruth;
module.exports.addTruthResponse = addTruthResponse;
module.exports.getTask = getTask;
module.exports.createDare = createDare;
module.exports.createQuestion = createQuestion;