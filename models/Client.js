const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lifts: {
    type: [],
    default: ['Bench Press', 'Deadlift', 'Squat'],
  },
  workouts: {
    type: [],
    default: [],
  },
  records: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model('client', ClientSchema);
