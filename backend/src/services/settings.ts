import dbConnection from '../database/database'

async function sendFeedback(subject, feedback) {
  return dbConnection
    .postFeedback(subject, feedback)
    .then((resolve, reject) => {
      console.log('REEJCT!!!')
      if (reject) {
        console.log('REJECT ISS')
        console.log(reject)
        return reject
      }
      if (resolve.affectedRows) {
        return 'success'
      } else {
        return 'error'
      }
    })
    .catch((err) => {
      return err
    })
}

module.exports.sendFeedback = sendFeedback
