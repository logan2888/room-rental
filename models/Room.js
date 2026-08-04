const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['single', 'shared', 'apartment'],
    required: true
  },
  pricePerMonth: {
    type: Number,
    required: true
  },
  location: {
    city: { type: String, required: true },
    district: { type: String },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  amenities: [{ type: String }],
  images: [{ type: String }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);