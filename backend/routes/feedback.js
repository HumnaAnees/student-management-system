const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.status(201).send({ message: "Feedback Submitted" });
});

router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.send(feedbacks);
});

module.exports = router;