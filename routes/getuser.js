const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Classes = require("../models/Classes");
const fetchuser = require('../middleware/fetchuser');
const mongoose = require("mongoose");

router.post('/', fetchuser,
    async (req, res) => {
        try {
            const userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            console.log(user._id);
            const classid = await Classes.find({ userid: user._id}).select("_id");
            console.log(classid);
            const userdeails = {
                user:user,
                classid:classid
            };
           
            res.send(userdeails);

        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error: error });
            console.log(error);
        }

    });

module.exports = router;