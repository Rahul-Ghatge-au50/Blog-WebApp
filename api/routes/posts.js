const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//CREATE POST
router.post('/',async (req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put('/:id',async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            const updatePost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatePost);
        }else{
            res.status(401).json('You can only update your post');
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete('/:id',async (req,res) => {
    //---------NOT WORKING----------
    // try{
    //     const post = await Post.findById(req.params.id);
    //     if(post.username === req.body.username){
    //         try{
    //             await Post.delete();
    //             res.status(200).json('Post is deleted');
    //         }catch(err){
    //             res.status(500).json(err);
    //         }
    //     }else{
    //         res.status(401).json('You can only delete your post');
    //     }
    // }catch(err){
    //     res.status(500).json(err)
    // }
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post is Deleted')
    }catch(err){
        res.status(401).json('You can only delete your post')
    }
})


//GET POST
router.get('/:id',async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL POST
router.get('/getAllPost/:id',async (req,res) => {
    // let username = req.query.user;
    let catName = req.query.cat;
    try{
        if(req.params.id){
            let post = await Post.find({user_id:req.params.id})
            res.status(200).json(post);
        }else if(catName){
            let post = await Post.find({
                categories:{
                    $in:[catName]
                }
            })
            res.status(200).json(post)
        }else{
            let post = await Post.find();
            res.status(200).json(post);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/getSrotedSer/:title',async (req,res) => {
    // let username = req.query.user;
    let catName = req.query.cat;
    
    try{
        if(req.params.title){
            let post = await Post.find({title :{ $regex: req.params.title, $options: "i" }})
            res.status(200).json(post);
        }else if(catName){
            let post = await Post.find({
                categories:{
                    $in:[catName]
                }
            })
            res.status(200).json(post)
        }else{
            let post = await Post.find();
            res.status(200).json(post);
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//

module.exports = router;