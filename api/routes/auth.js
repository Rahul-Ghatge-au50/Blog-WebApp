const express = require('express');
const Users = require('../models/Users');
const bcrypt = require("bcryptjs");

const router = express.Router();

//REGISTER
router.post('/register', async (req, res) => {
    const password = req.body.password;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        });

        const user = await newUser.save();

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    const email = req.body.email;

    try {
        const user = await Users.findOne({ email:email});

        if(user === null || user === undefined || !user){
            return res.status(400).json("Incorrect email or account is deleted");
        }

        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!validate){
            return res.status(400).json('Wrong Creditianls!');
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})


module.exports = router;
