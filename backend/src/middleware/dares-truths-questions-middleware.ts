import { RequestHandler } from 'express'
import { getTruthsHistory } from '../services/dares-truths-questions'
import { authenticateAdministrator } from './auth-middleware'

//authenticateAcess to a get request of a truth, dare, ore question
export const authenticateAccess: RequestHandler = (req, res, next) => {
  if (!req.query.uuid || req.query.uuid != req.user.uuid) {
    authenticateAdministrator(req, res, next)
  } else {
    return next()
  }
}

export const ensureBodyHasResponse: RequestHandler = (req, res, next) => {
  if (!req.body.response) {
    return res.status(400).json({
      status: 'error',
      error: 'No body given for response',
    })
  }
  return next()
}

//authenticate user has access to a specific truthId.
export const authenticateTruthHistoryAccess: RequestHandler = async (
  req,
  res,
  next
) => {
  let userFoundTruthJson
  let truthsHistoryArr = await getTruthsHistory(true, null, null, req.user.uuid) //user can only edit current truths

  for (let truthJson of truthsHistoryArr) {
    if (truthJson.TruthHistoryId == req.params.id) {
      userFoundTruthJson = truthJson
      break
    }
  }

  if (!userFoundTruthJson) {
    return res.status(403).json({
      status: 'error',
      error: 'User does not have access to TruthHistoryId ' + req.params.id,
    })
  }
  if (userFoundTruthJson.Data != null) {
    return res.status(403).json({
      status: 'error',
      error:
        'Response has already been submitted for TruthHistoryId ' +
        req.params.id,
    })
  }
  return next()
}
