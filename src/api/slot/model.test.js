import { Slot } from '.'
import { User } from '../user'

let user, slot

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  slot = await Slot.create({ driver: user, source: 'test', destination: 'test', dateTime: 'test', availableSeats: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = slot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(slot.id)
    expect(typeof view.driver).toBe('object')
    expect(view.driver.id).toBe(user.id)
    expect(view.source).toBe(slot.source)
    expect(view.destination).toBe(slot.destination)
    expect(view.dateTime).toBe(slot.dateTime)
    expect(view.availableSeats).toBe(slot.availableSeats)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = slot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(slot.id)
    expect(typeof view.driver).toBe('object')
    expect(view.driver.id).toBe(user.id)
    expect(view.source).toBe(slot.source)
    expect(view.destination).toBe(slot.destination)
    expect(view.dateTime).toBe(slot.dateTime)
    expect(view.availableSeats).toBe(slot.availableSeats)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
