const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  routine: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model('workout', WorkoutSchema);
