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

async function createTruth(truthDescription, points, categoryId, minPoints, hoursToComplete) {
    return dbConnection.addTruthToDB(truthDescription, points, categoryId, minPoints, hoursToComplete).then(result => {
        return result.affectedRows > 0;
    })
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

//TODO: Finish update for truths
async function updateTruthResponse(truthId, response) {}

module.exports.getTruthsHistory = getTruthsHistory;
module.exports.createTruth = createTruth;
module.exports.createDare = createDare;
module.exports.createQuestion = createQuestion;
