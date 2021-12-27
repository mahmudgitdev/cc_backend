const express = require('express');
const route = express.Router();
const middleware = require('./middleware');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

route.post('/save/qq',middleware, async (req,res)=>{

   const quiz = new Quiz({
     title: req.body.title,
     userId: req.user._id,
     questions: req.body.questions
   });

  await quiz.save().then((result)=>{
    res.status(200).json({
      success:"success"
    })
  }).catch(err=>{
    res.status(400).send(err);
  })

});

module.exports = route;