const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lifts: {
    type: [],
  },
  currentWorkout: {
    type: [],
  },
  previousWorkouts: {
    type: [],
  },
  personalBests: {
    type: [],
  },
  lastAccessed: {
    type: Number,
  },
});

module.exports = mongoose.model('client', ClientSchema);
