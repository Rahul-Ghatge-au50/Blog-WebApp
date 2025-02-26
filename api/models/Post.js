const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Post',postSchema);