const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    default: 'Workout',
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [],
    default: [],
  },
  public: {
    type: Boolean,
    default: false,
  },
  routine: {
      type: [],
      default: [],
  },
});

module.exports = mongoose.model('workout', WorkoutSchema);
