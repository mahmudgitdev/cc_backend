const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
    
})

const User = mongoose.model('User',userSchema)
module.exports = User