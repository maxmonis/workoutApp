const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, date, routine } = req.body;
    try {
      const newWorkout = new Workout({
        name,
        date,
        routine,
        user: req.user.id,
      });
      const workout = await newWorkout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { name, date, routine } = req.body;
  const workoutFields = {};
  workoutFields.isActive = isActive;
  if (name) workoutFields.name = name;
  if (date) workoutFields.date = date;
  if (routine) workoutFields.routine = routine;
  try {
    let workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: 'Workout not found' });
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { $set: workoutFields },
      { new: true }
    );
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ msg: 'Workout not found' });
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Workout.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
