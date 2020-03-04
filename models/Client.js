const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  lifts: {
    type: []
  },
  previousWorkouts: {
    type: []
  },
  personalBests: {
    type: []
  }
});

module.exports = mongoose.model('client', ClientSchema);
