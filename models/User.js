const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lifts: {
    type: [],
    default: ['Bench Press', 'Deadlift', 'Squat'],
  },
});

module.exports = mongoose.model('user', UserSchema);
