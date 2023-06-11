import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Request } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, request

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  request = await Request.create({ passenger: user })
})

test('POST /requests 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, slot: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.slot).toEqual('test')
  expect(typeof body.passenger).toEqual('object')
})

test('POST /requests 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /requests 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].passenger).toEqual('object')
})

test('GET /requests 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /requests/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${request.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(request.id)
  expect(typeof body.passenger).toEqual('object')
})

test('GET /requests/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${request.id}`)
  expect(status).toBe(401)
})

test('GET /requests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /requests/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${request.id}`)
    .send({ access_token: userSession, slot: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(request.id)
  expect(body.slot).toEqual('test')
  expect(typeof body.passenger).toEqual('object')
})

test('PUT /requests/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${request.id}`)
    .send({ access_token: anotherSession, slot: 'test' })
  expect(status).toBe(401)
})

test('PUT /requests/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${request.id}`)
  expect(status).toBe(401)
})

test('PUT /requests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, slot: 'test' })
  expect(status).toBe(404)
})

test('DELETE /requests/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${request.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /requests/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${request.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /requests/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${request.id}`)
  expect(status).toBe(401)
})

test('DELETE /requests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
