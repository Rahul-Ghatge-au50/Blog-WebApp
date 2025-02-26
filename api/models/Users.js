const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: ""
    },
    desc:{
        type:String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Users',UsersSchema);