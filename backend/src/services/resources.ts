import dbConnection from '../database/database'

async function getResources(specificResource) {
  let resourceQueryResult = await dbConnection.getResources(specificResource)
  if (resourceQueryResult) {
    return resourceQueryResult
  }
}

module.exports.getResources = getResources
