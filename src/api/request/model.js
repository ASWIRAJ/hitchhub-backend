import mongoose, { Schema } from 'mongoose'

const requestSchema = new Schema({
  passenger: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  slot: {
    type: Schema.ObjectId,
    ref: 'Slot',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

requestSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      passenger: this.passenger.view(full),
      slot: this.slot,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Request', requestSchema)

export const schema = model.schema
export default model
