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
            const classid = await Classes.findOne({ userid: user._id}).select("_id");
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

    router.get('/users', async (req, res) => {
        try {
          const users = await User.find({ approved: "yes" });
          res.status(200).json(users);
            } catch (error) {
          res.status(500).send({ message: 'An error occurred while fetching users' });
        }
      });
    router.get('/pendingusers', async (req, res) => {
        try {
          const users = await User.find({ approved: "no" });
          res.status(200).json(users);
            } catch (error) {
          res.status(500).send({ message: 'An error occurred while fetching users' });
        }
      });

      router.post('/delete', async (req, res) => {
        try {
            const { userId } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send({ message: "Invalid user ID format" });
            }
            const result = await User.findByIdAndDelete(userId);
    
            if (!result) {
                return res.status(404).send({ message: "user record not found" });
            }
            res.status(200).send({
                message: "user deleted successfully"
            });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).send({ message: "Error deleting user", error: error.message });
        }
    });
      router.post('/approval', async (req, res) => {
        try {
            const { pendingUserId } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(pendingUserId)) {
                return res.status(400).send({ message: "Invalid pendingUserId ID format" });
            }
            const result = await User.findOneAndUpdate(
                { _id: pendingUserId },
                { approved: "yes" },
                { new: true }
            );
            
            if (!result) {
                return res.status(404).send({ message: "user record not found" });
            }
            res.status(200).send({
                message: "user approve successfully"
            });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).send({ message: "Error approving user", error: error.message });
        }
    });
      router.post('/disapproval', async (req, res) => {
        try {
            const { pendingUserId } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(pendingUserId)) {
                return res.status(400).send({ message: "Invalid pendingUserId ID format" });
            }
            const result = await User.findByIdAndDelete(pendingUserId);
            const classid = await Classes.deleteOne({ userid: pendingUserId});
            
            if (!result) {
                return res.status(404).send({ message: "user record not found" });
            }
            res.status(200).send({
                message: "user deleted successfully"
            });
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).send({ message: "Error deleting user", error: error.message });
        }
    });
    

module.exports = router;