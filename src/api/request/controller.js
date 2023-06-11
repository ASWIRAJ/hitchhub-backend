import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Request } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Request.create({ ...body, passenger: user })
    .then((request) => request.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Request.find(query, select, cursor)
    .populate('passenger')
    .then((requests) => requests.map((request) => request.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Request.findById(params.id)
    .populate('passenger')
    .then(notFound(res))
    .then((request) => request ? request.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Request.findById(params.id)
    .populate('passenger')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'passenger'))
    .then((request) => request ? Object.assign(request, body).save() : null)
    .then((request) => request ? request.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Request.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'passenger'))
    .then((request) => request ? request.remove() : null)
    .then(success(res, 204))
    .catch((e) => {
      console.log('failed3');
      console.log(e);
      next(e)
    })
