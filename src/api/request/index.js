import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Request, { schema } from './model'

const router = new Router()
const { slot, status } = schema.tree

/**
 * @api {post} /requests Create request
 * @apiName CreateRequest
 * @apiGroup Request
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam slot Request's slot.
 * @apiSuccess {Object} request Request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Request not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ slot }),
  create)

/**
 * @api {get} /requests Retrieve requests
 * @apiName RetrieveRequests
 * @apiGroup Request
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} requests List of requests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /requests/:id Retrieve request
 * @apiName RetrieveRequest
 * @apiGroup Request
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} request Request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Request not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /requests/:id Update request
 * @apiName UpdateRequest
 * @apiGroup Request
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam slot Request's slot.
 * @apiSuccess {Object} request Request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Request not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ status }),
  update)

/**
 * @api {delete} /requests/:id Delete request
 * @apiName DeleteRequest
 * @apiGroup Request
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Request not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
