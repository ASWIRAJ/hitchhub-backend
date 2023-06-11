import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const slotSchema = new Schema({
  driver: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String
  },
  destination: {
    type: String
  },
  dateTime: {
    type: String
  },
  availableSeats: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

slotSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      driver: this.driver.view(full),
      source: this.source,
      destination: this.destination,
      dateTime: this.dateTime,
      availableSeats: this.availableSeats,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


slotSchema.path("destination").set(function (destination) {
  if (!this.destination) {
    this.destination = destination.replace(/^(.+)@.+$/, '$1')
  }

  return destination
})
slotSchema.plugin(mongooseKeywords, { paths: ["_id", "destination"] })

const model = mongoose.model('Slot', slotSchema)

export const schema = model.schema
export default model

