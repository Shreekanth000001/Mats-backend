const express = require('express');
const router = express.Router();
const Classes = require('../models/Classes');

router.get('/', async (req, res) => {
    try {
      const classes = await Classes.find({ approved: "yes" });
      res.status(200).json(classes);
        } catch (error) {
      res.status(500).send({ message: 'An error occurred' });
    }
  });

module.exports = router;