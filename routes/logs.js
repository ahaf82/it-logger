const express = require('express');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Logs');

// @routes    Get logs
// @desc      Get all logs
// @access    Public
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find({ logs: req._id }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes    Search logs
// @desc      Search and Filter logs
// @access    Public
router.get("/:q", async (req, res) => {
  try {
    const logs = await Log.find({ logs: req._id }).sort({
      date: -1,
    });
    let searchContent = logs.filter(item => {
      let regex = new RegExp(req.params.q, 'gi');
      return item.message.match(regex) || item.tech.match(regex);
    });
    res.json(searchContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes    ADD log
// @desc      Add a log message
// @access    Public
router.post('/', [
  check('message', 'Please enter a message').not().isEmpty(),
  check('tech', 'Please choose a tech').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, tech, attention } = req.body;

    try {
      let log = await Log.findOne({ message });

      log = new Log({
        message,
        tech,
        attention
      });

      await log.save();

      res.send(log);

    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  });

// @routes    Put logs/:id
// @desc      Update log
// @access    Public
router.put("/:id", async (req, res) => {
  const { message, tech, attention } = req.body;

  // Build contact object
  const logFields = {};
  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  if (attention) logFields.attention = attention;
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(req.params.id,
      { $set: logFields },
      { new: true });

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

});


// @routes    Delete log/:id
// @desc      Delete log
// @access    Public
router.delete("/:id", async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Log.findByIdAndRemove(req.params.id);

    res.json('Log removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
