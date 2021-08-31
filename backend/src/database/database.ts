/*File will have all of the methods for database querying*/
import mysql from 'mysql'

/*Create a connection Pool*/
const sqlConnectionPool = mysql.createPool({
  connectionLimit: 10,
  user: 'root', //process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: 'au_cares_db',
})

//Create a new user in DB and add verification
export function createNewUserInDB(
  hashedEmail: string,
  hashedPassword: string,
  isAdmin: boolean,
  verificationCode: any
) {
  return new Promise((resolve, reject) => {
    let sqlQueryCreateUser =
      'INSERT INTO User(UserEmail,Password,UUID,IsAdmin) VALUES (?,?,UuidToBin(UUID()),?)' //add user in User table
    let sqlQueryAddVerificationCode =
      'INSERT INTO VerificationCodes(UserId,ConfirmationCode) VALUES(?,?)' //add user verification code
    let sqlQueryAddCategoryPoints =
      'INSERT INTO CategoryPoints(UserId) VALUES(?)'
    sqlConnectionPool.getConnection((err, mySqlConnection) => {
      if (err) reject(err)
      mySqlConnection.query(
        sqlQueryCreateUser,
        [hashedEmail, hashedPassword, isAdmin],
        (err, result) => {
          if (err) reject(err)
          mySqlConnection.query(
            sqlQueryAddCategoryPoints,
            [result.insertId],
            (err, _resultAddingCategories) => {
              //add category min points
              if (err) reject(err)
              mySqlConnection.query(
                sqlQueryAddVerificationCode,
                [result.insertId, verificationCode],
                (err, _result) => {
                  //add verification code
                  if (err) reject(err)
                  resolve('success')
                  mySqlConnection.release()
                }
              )
            }
          )
        }
      )
    })
  })
}

export function getUserVerificationCodeFromDB(uuid: string) {
  let sqlQuery =
    'SELECT ConfirmationCode, Expiration FROM User,VerificationCodes WHERE User.UserId = VerificationCodes.UserId AND UUID = UuidToBin(?)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
      if (err) reject(err)
      resolve(result[0])
    })
  })
}

export function updateUserInformation(
  uuid: string,
  infoToUpdate: string,
  newValue: string,
  requiredVerification: boolean
) {
  let sqlQueryUpdate = `UPDATE USER SET ${infoToUpdate} = ? WHERE UUID=UuidToBin(?)`
  let sqlQueryDeleteVerificationCode = `DELETE FROM VerificationCodes WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.getConnection((err, mySqlConnection) => {
      if (err) reject(err)
      mySqlConnection.query(
        sqlQueryUpdate,
        [newValue, uuid],
        (err, updateResult) => {
          if (err) reject(err)
          if (requiredVerification) {
            mySqlConnection.query(
              sqlQueryDeleteVerificationCode,
              [uuid],
              (err) => {
                if (err) reject(err)
                resolve(updateResult)
                mySqlConnection.release()
              }
            )
          }
        }
      )
    })
  })
}

/** Get User Information from user based on Email */
export function getUserInfoFromEmail(hashedEmail: string) {
  let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UserEmail=?`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [hashedEmail], (err, result) => {
      if (err) reject(err)
      resolve(result[0])
    })
  })
}

/** Get user info from UUID */
export function getUserInfoFromUUID(uuid: string) {
  let sqlQuery = `SELECT UserId,UserEmail,Password,UuidFromBin(UUID),IsAdmin,UserVerified,ConsentFormSigned,userAccountDisabled FROM User WHERE UUID=UuidToBin(?)`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
      if (err) reject(err)
      resolve(result[0])
    })
  })
}

export function storeRefreshTokenForUser(uuid: string, refreshToken: string) {
  let sqlQuery = `REPLACE INTO UserRefreshTokens SELECT UserId,? FROM User WHERE UUID=UuidToBin(?)` //worry alter about already having  key existing
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [refreshToken, uuid], (err, result) => {
      if (err) reject(err)
      resolve(result[0])
    })
  })
}

export function removeRefreshTokenForUser(uuid: string) {
  let sqlQuery = `DELETE FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

export function getUserRefreshTokenFromUUID(uuid: string) {
  let sqlQuery = `SELECT RefreshToken FROM UserRefreshTokens WHERE UserId = (SELECT UserId FROM User WHERE UUID=UuidToBin(?))`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
      if (err) reject(err)
      resolve(result[0])
    })
  })
}

export function addTruthToDB(
  truthDescription: string,
  points: number,
  cateogryId: number,
  minPoints: number,
  hoursToComplete: number
) {
  let sqlQuery =
    'INSERT INTO Truths(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(
      sqlQuery,
      [truthDescription, points, cateogryId, minPoints, hoursToComplete],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

export function addDareToDB(
  dareDescription: string,
  points: number,
  cateogryId: number,
  minPoints: number,
  hoursToComplete: number
) {
  let sqlQuery =
    'INSERT INTO Dares(Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(
      sqlQuery,
      [dareDescription, points, cateogryId, minPoints, hoursToComplete],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

export function addQuestionToDB(
  questionTitle: string,
  questionDescription: string,
  points: number,
  cateogryId: number,
  minPoints: number,
  hoursToComplete: number
) {
  let sqlQuery =
    'INSERT INTO Questions(QuestionTitle, Description, Points, CategoryId, MinPointsNeeded, HoursToComplete) VALUES (?,?,?,?,?,?)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(
      sqlQuery,
      [
        questionTitle,
        questionDescription,
        points,
        cateogryId,
        minPoints,
        hoursToComplete,
      ],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

export function getTruthsHistory(
  isCurrent: boolean,
  isComplete: boolean,
  category: string,
  uuid: string
) {
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
    sqlConnectionPool.query(
      sqlQuery,
      [
        isComplete,
        isComplete,
        uuid,
        uuid,
        category,
        category,
        isCurrent,
        isCurrent,
      ],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

/** TODO: FINISH UPDATE TRUTH RESPONSE */
export function updateTruthResponse(truthId: number, truthResponse: string) {
  let sqlQueryCreateNewTruthResponse =
    'INSERT INTO TruthsResponses(Data) VALUES(?)'
  let sqlQueryAddTruthResponseId =
    'UPDATE TruthsHistory SET TruthResponseId =?, Completed = 1 WHERE TruthHistoryId =?'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.getConnection((err, mySqlConnection) => {
      if (err) reject(err)
      mySqlConnection.query(
        sqlQueryCreateNewTruthResponse,
        [truthResponse],
        (err, result) => {
          if (err) reject(err)
          mySqlConnection.query(
            sqlQueryAddTruthResponseId,
            [result.insertId, truthId],
            (err, resultFinal) => {
              if (err) reject(err)
              resolve(resultFinal)
            }
          )
        }
      )
    })
  })
}

export function getAllCategoryPoints(uuid: string) {
  let sqlQuery =
    'SELECT CategoryPoints.* FROM User,CategoryPoints WHERE CategoryPoints.UserId = User.UserId AND User.UUID = UuidToBin(?)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [uuid], (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/** get 1 truth with the parameters. Also used to get a truth for a user to have */
export function getTruthTask(
  category: string,
  minPointsNeeded: number,
  isCounted: boolean
) {
  let sqlQueryGetTask = `
    SELECT *
    FROM Truths
    INNER JOIN CategoryTypes ON Truths.CategoryId = CategoryTypes.CategoryId
    WHERE CategoryTypes.CategoryName=? AND MinPointsNeeded >=?
    ORDER BY RAND()
    LIMIT 1
    `
  let updateTruthCountSentSqlQuery = `
    UPDATE Truths
    SET SentNum = SentNum+1
    WHERE TruthId = ?
    `

  return new Promise((resolve, reject) => {
    sqlConnectionPool.getConnection((err, mySqlConnection) => {
      if (err) reject(err)
      mySqlConnection.query(
        sqlQueryGetTask,
        [category, minPointsNeeded],
        (err, result) => {
          if (err) reject(err)

          if (isCounted) {
            mySqlConnection.query(
              updateTruthCountSentSqlQuery,
              [result.TruthId],
              (err) => {
                if (err) reject(err)
              }
            )
          }
          resolve(result)
          mySqlConnection.release()
        }
      )
    })
  })
}

/** assigns user new task. Things for multiple choice and dropdown will be in separate query */
export function assignUserNewTruthTask(uuid: string, truthId: number) {
  let sqlQuery = `INSERT INTO TruthsHistory(UserId,TruthId,Expiration)
    SELECT (SELECT UserId FROM User WHERE User.UUID=UuidToBin(?)),?,(SELECT NOW() + INTERVAL Truths.HoursToComplete HOUR FROM Truths WHERE TruthId =?)`
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(
      sqlQuery,
      [uuid, truthId, truthId],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

export function postFeedback(subject: string, feedback: string) {
  let sqlQuery =
    'INSERT INTO ApplicationFeedback(Subject,Feedback) VALUES ("?","?")'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(sqlQuery, [subject, feedback], (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

export async function getResources(specificResource: string) {
  let sqlQuery =
    'SELECT * FROM Resources WHERE (CASE WHEN ISNULL(?)THEN TRUE ELSE Name=? END)'
  return new Promise((resolve, reject) => {
    sqlConnectionPool.query(
      sqlQuery,
      [specificResource, specificResource],
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}
