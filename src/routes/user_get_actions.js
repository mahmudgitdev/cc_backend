const express = require('express');
const route = express.Router();
const middleware = require('./middleware');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Assignment = require('../models/Assignment');
route.get('/auth/user',middleware, async (req,res)=>{
    const user = await User.findById(req.user._id);
    res.send(user)
});

route.get('/my-library',middleware, async(req,res)=>{
    const mylibrary = await Quiz.find({userId: req.user._id}).sort({createdAt: -1}).exec();
    const myassignment = await Assignment.find({userId: req.user._id}).sort({createdAt: -1}).exec();
    res.json({
        mylibrary,
        myassignment
    });
});

route.post('/get/quiz',middleware, async(req,res)=>{
    const quiz = await Quiz.findById(req.body.id);
    res.send(quiz);
});

route.post('/get/assignment/report',middleware, async(req,res)=>{
    const assignment = await Assignment.findById(req.body.id);
    res.send(assignment);
});
route.post('/get/assignment/by_quizid',middleware, async(req,res)=>{
    const assignment = await Assignment.find({quizId: req.body.id}).sort({createdAt: -1}).exec();
    res.send(assignment);
});


route.post('/get/challenge', async(req,res)=>{
    const assignment = await Assignment.findById(req.body.id);
    const quiz = await Quiz.findById(assignment.quizId);
    res.send(quiz);
    
})

module.exports = route;