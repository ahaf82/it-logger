const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Tech = require("../models/techs");

// @routes    Get techs
// @desc      Get all techs
// @access    Public
router.get("/", async (req, res) => {
  try {
    const techs = await Tech.find({ techs: req._id }).sort({
      date: -1,
    });
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes    POST tech
// @desc      Add new tech
// @access    Public
router.post(
  "/",
  async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        firstName,
        lastName
      });

      const tech = await newTech.save();

      res.json(tech);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @routes    Delete tech/:id
// @desc      Delete tech
// @access    Public
router.delete("/:id", async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);

    res.json('Tech removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
