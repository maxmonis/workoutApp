const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Client = require('../models/Client');

router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id }).sort({ date: -1 });
    res.json(clients);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      phone,
      isActive,
      lifts,
      previousWorkouts,
      personalBests
    } = req.body;
    try {
      const newClient = new Client({
        name,
        email,
        phone,
        isActive,
        lifts,
        previousWorkouts,
        personalBests,
        user: req.user.id
      });
      const client = await newClient.save();
      res.json(client);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const {
    name,
    email,
    phone,
    isActive,
    lifts,
    previousWorkouts,
    personalBests
  } = req.body;
  const clientFields = {};
  clientFields.isActive = isActive;
  if (name) clientFields.name = name;
  if (email) clientFields.email = email;
  if (phone) clientFields.phone = phone;
  if (lifts) clientFields.lifts = lifts;
  if (previousWorkouts) clientFields.previousWorkouts = previousWorkouts;
  if (personalBests) clientFields.personalBests = personalBests;
  try {
    let client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ msg: 'Client not found' });
    if (client.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: clientFields },
      { new: true }
    );
    res.json(client);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ msg: 'Client not found' });
    if (client.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Client.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
