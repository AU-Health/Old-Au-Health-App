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

module.exports.getTruthsHistory = getTruthsHistory;