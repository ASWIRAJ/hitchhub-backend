import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Slot, { schema } from './model'

const router = new Router()
const { source, destination, dateTime, availableSeats } = schema.tree

/**
 * @api {post} /slots Create slot
 * @apiName CreateSlot
 * @apiGroup Slot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam source Slot's source.
 * @apiParam destination Slot's destination.
 * @apiParam dateTime Slot's dateTime.
 * @apiParam availableSeats Slot's availableSeats.
 * @apiSuccess {Object} slot Slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slot not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ source, destination, dateTime, availableSeats }),
  create)

/**
 * @api {get} /slots Retrieve slots
 * @apiName RetrieveSlots
 * @apiGroup Slot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} slots List of slots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)
/**
 * @api {get} /slots/:id Retrieve slot
 * @apiName RetrieveSlot
 * @apiGroup Slot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} slot Slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slot not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /slots/:id Update slot
 * @apiName UpdateSlot
 * @apiGroup Slot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam source Slot's source.
 * @apiParam destination Slot's destination.
 * @apiParam dateTime Slot's dateTime.
 * @apiParam availableSeats Slot's availableSeats.
 * @apiSuccess {Object} slot Slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slot not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ source, destination, dateTime, availableSeats }),
  update)

/**
 * @api {delete} /slots/:id Delete slot
 * @apiName DeleteSlot
 * @apiGroup Slot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Slot not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
