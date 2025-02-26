const Users = require('../models/Users');
const bcrypt = require("bcryptjs");
const express = require('express');
const Post = require('../models/Post');

const router = express.Router();


//UPDATE
router.put('/:id', async (req, res) => {
    try{
        if (req.body.userid !== req.params.id) {
            return res.status(401).json('You can update only your account');
        };

        const updatedUser = await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        if(!updatedUser){
            return res.status(401).json({message:"Internal server error"});
        };

        res.status(200).json({message:"User is Updated Successfully",updatedUser});
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})


//DELETE
router.delete('/:id', async (req, res) => {
    
    try {
        if(req.params.id){
            const user = await Users.findById(req.params.id);
            // await Post.deleteMany({ username: user.username });
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json();
        }
    } catch (err) {
        res.status(404).json('User not found')
    }
})

//GET USER
router.get('/getSingleUser/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        const { password, ...others } = user._doc;
        res.status(200).json({others,message:"User get successfully"});
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router