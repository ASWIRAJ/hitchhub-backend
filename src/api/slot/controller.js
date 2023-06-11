import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Slot } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Slot.create({ ...body, driver: user })
    .then((slot) => slot.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
{
  console.log(query, select)
  return Slot.find(query, select, cursor)
    .populate('driver')
    .then((slots) => slots.map((slot) => slot.view()))
    .then(success(res))
    .catch(next)
  }

export const show = ({ params }, res, next) =>
  Slot.findById(params.id)
    .populate('driver')
    .then(notFound(res))
    .then((slot) => slot ? slot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Slot.findById(params.id)
    .populate('driver')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'driver'))
    .then((slot) => slot ? Object.assign(slot, body).save() : null)
    .then((slot) => slot ? slot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Slot.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'driver'))
    .then((slot) => slot ? slot.remove() : null)
    .then(success(res, 204))
    .catch(next)
