const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Help = require('../models/Help');
const {validationResult } = require('express-validator');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newHelp = await Help.create({
                    userid: req.body.userid,
                    title: req.body.title,
                    description: req.body.description,
                });
                res.status(200).send({ message: "Successfully sent the report!" });
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "An unexpected error occurred while creating the help report." });
            }
        } else {
            res.send({ errors: errors.array() });
        }
    })

    router.get('/getall', async (req, res) => {
        try {
          const helps = await Help.find({ });
          res.status(200).json(helps);
            } catch (error) {
          res.status(500).send({ message: 'An error occurred' });
        }
      });

      router.post('/delete', async (req, res) => {
        try {
            const { helpId } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(helpId)) {
                return res.status(400).send({ message: "Invalid help ID format" });
            }
            const result = await Help.findByIdAndDelete(helpId);
    
            if (!result) {
                return res.status(404).send({ message: "help record not found" });
            }
            res.status(200).send({
                message: "help deleted successfully"
            });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).send({ message: "Error deleting help", error: error.message });
        }
    });

module.exports = router;