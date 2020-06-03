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
  exercises: {
    type: [],
  },
  workouts: {
    type: [],
  },
  records: {
    type: [],
  },
});

module.exports = mongoose.model('client', ClientSchema);
