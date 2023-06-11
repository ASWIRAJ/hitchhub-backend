import { Request } from '.'
import { User } from '../user'

let user, request

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  request = await Request.create({ passenger: user, slot: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = request.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(request.id)
    expect(typeof view.passenger).toBe('object')
    expect(view.passenger.id).toBe(user.id)
    expect(view.slot).toBe(request.slot)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = request.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(request.id)
    expect(typeof view.passenger).toBe('object')
    expect(view.passenger.id).toBe(user.id)
    expect(view.slot).toBe(request.slot)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
