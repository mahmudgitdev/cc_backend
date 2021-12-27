const express = require('express');
const route = express.Router();
const middleware = require('./middleware');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
route.get('/auth/user',middleware, async (req,res)=>{
    const user = await User.findById(req.user._id);
    res.send(user)
});

route.get('/my-library',middleware, async(req,res)=>{
    const mylibrary = await Quiz.find({userId: req.user._id}).sort({createdAt: -1}).exec();
    res.send(mylibrary);
});

route.post('/get/quiz',middleware, async(req,res)=>{
    const quiz = await Quiz.findById(req.body.id);
    res.send(quiz);
});

module.exports = route;