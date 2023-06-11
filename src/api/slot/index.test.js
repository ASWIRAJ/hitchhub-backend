import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Slot } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, slot

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  slot = await Slot.create({ driver: user })
})

test('POST /slots 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, source: 'test', destination: 'test', dateTime: 'test', availableSeats: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.source).toEqual('test')
  expect(body.destination).toEqual('test')
  expect(body.dateTime).toEqual('test')
  expect(body.availableSeats).toEqual('test')
  expect(typeof body.driver).toEqual('object')
})

test('POST /slots 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /slots 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].driver).toEqual('object')
})

test('GET /slots 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /slots/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${slot.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(slot.id)
  expect(typeof body.driver).toEqual('object')
})

test('GET /slots/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${slot.id}`)
  expect(status).toBe(401)
})

test('GET /slots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /slots/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${slot.id}`)
    .send({ access_token: userSession, source: 'test', destination: 'test', dateTime: 'test', availableSeats: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(slot.id)
  expect(body.source).toEqual('test')
  expect(body.destination).toEqual('test')
  expect(body.dateTime).toEqual('test')
  expect(body.availableSeats).toEqual('test')
  expect(typeof body.driver).toEqual('object')
})

test('PUT /slots/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${slot.id}`)
    .send({ access_token: anotherSession, source: 'test', destination: 'test', dateTime: 'test', availableSeats: 'test' })
  expect(status).toBe(401)
})

test('PUT /slots/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${slot.id}`)
  expect(status).toBe(401)
})

test('PUT /slots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, source: 'test', destination: 'test', dateTime: 'test', availableSeats: 'test' })
  expect(status).toBe(404)
})

test('DELETE /slots/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${slot.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /slots/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${slot.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /slots/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${slot.id}`)
  expect(status).toBe(401)
})

test('DELETE /slots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
