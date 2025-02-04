const express = require('express')
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

router.post('/', fetchuser,
    async (req, res) => {
        try {
            const userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            res.send(user);

        } catch (error) {
            res.status(500).send('Internal server error');
        }

    });

module.exports = router;