/*File will have all authentication related things here*/
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {
  createNewUserInDB,
  getUserInfoFromEmail,
  getUserInfoFromUUID,
  getUserRefreshTokenFromUUID,
  getUserVerificationCodeFromDB,
  removeRefreshTokenForUser,
  updateUserInformation,
} from '../database/database'

//method to create an account
export async function createUserAccount(
  email: string,
  password: string,
  isAdmin: boolean
) {
  try {
    const hashAlgo = crypto.createHash('sha256')
    const hashedEmail = hashAlgo.update(email).digest('hex')
    const passwordSalt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, passwordSalt) //hashes with salt
    const verificationCode = '123'

    await createNewUserInDB(
      hashedEmail,
      hashedPassword,
      isAdmin,
      verificationCode
    )
    let queryResult = await getUserInformationFromEmail(hashedEmail, true)
    let uuid = queryResult['UuidFromBin(UUID)'].toString()
    return {
      uuid: uuid,
      accessToken: await generateAccessToken(uuid),
    }
  } catch (err) {
    return new Error(err)
  }
}

/** login user. Returns user's UUID and JWT token */
export async function login(uuid: string, isVerified: boolean) {
  let accessToken = await generateAccessToken(uuid)
  let refreshToken = null

  if (isVerified) {
    refreshToken = generateAndStoreRefreshToken(uuid)
  }

  return {
    uuid: uuid,
    isVerified: !!isVerified,
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

/**logout user by deleting the refresh token ... returns undefined if error, otherwise num rows deletd */
export async function logout(uuid: string) {
  let queryResult = await removeRefreshTokenForUser(uuid)
  if (!queryResult) {
    return undefined
  }
  return queryResult.affectedRows
}

export async function getUserVerificationCode(uuid: string) {
  return await getUserVerificationCodeFromDB(uuid)
}

/** service of what to do once we are aware account is verified */
export async function updateAccountPostVerified(uuid: string) {
  await updateUserInformation(uuid, 'UserVerified', true, true)
  //maybe send email saying user is now verified

  return {
    accessToken: await generateAccessToken(uuid),
    refreshToken: generateAndStoreRefreshToken(uuid),
  }
}

/** get user information from UUID */
export async function getUserInformationFromUUID(uuid: string) {
  return await getUserRefreshTokenFromUUID(uuid)
}

/** get user information from email */
export async function getUserInformationFromEmail(
  email: string,
  isHashed: boolean
) {
  if (!isHashed) {
    const hashAlgo = crypto.createHash('sha256')
    email = hashAlgo.update(email).digest('hex')
  }
  return await getUserInfoFromEmail(email)
}

export async function isRefreshTokenCorrectForAccount(
  uuid: string,
  refreshToken: string
) {
  let queryResult = await getUserRefreshTokenFromUUID(uuid)
  return queryResult && queryResult['RefreshToken'] === refreshToken
}

//methods to change password, email, or other things

/** create a new JWT for the user --- maybe add points per category? */
export async function generateAccessToken(uuid: string) {
  return getUserInfoFromUUID(uuid)
    .then((response) => {
      let jwtPayload: Record<string, any> = {}
      jwtPayload['uuid'] = response['UuidFromBin(UUID)'].toString()
      jwtPayload['binaryUuid'] = response['UUID'] //not using this yet
      jwtPayload['userType'] = response.userType
      jwtPayload['isAdmin'] = !!response.IsAdmin
      jwtPayload['isVerified'] = response.UserVerified
      jwtPayload['consentSigned'] = response.ConsentFormSigned
      jwtPayload['isAccountDisabled'] = response.UserAccountDisabled
      return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3h',
      })
    })
    .catch((err) => {
      console.log('ERROR')
      console.log(err)
    })
}

/** create a refresh token for user */
export function generateAndStoreRefreshToken(uuid: string) {
  let refreshToken = jwt.sign(
    { uuid: uuid },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
  storeRefreshTokenForUser(uuid, refreshToken)
  return refreshToken
}
