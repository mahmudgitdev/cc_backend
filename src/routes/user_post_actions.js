const express = require('express');
const route = express.Router();
const middleware = require('./middleware');
const Quiz = require('../models/Quiz');
const multer = require('multer');
const Assignment = require('../models/Assignment');
const fse = require('fs-extra');
const { promisify } = require('util');
const unlinkAsync = promisify(fse.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

route.post('/upload/image',upload.single('image'),(req,res)=>{
  
  res.json({
    fullpath: process.env.BASE_URL+req.file.path,
    path: req.file.path
  });

});

route.post('/upload/audio',upload.single('audio'),(req,res)=>{
  res.json({
    fullpath: process.env.BASE_URL+req.file.path,
    path: req.file.path
  });

});

route.post('/remove/file',async (req,res)=>{
  await unlinkAsync(req.body.path_file);
    res.json({
      success: "removed"
    });
})

route.post('/save/qq',middleware,async (req,res)=>{
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

route.post('/save/assignment',middleware, async (req,res)=>{
   const assignment = new Assignment({
     title: req.body.title,
     userId: req.user._id,
     quizId: req.body.quizId,
     gamepin: req.body.gamepin,
     endDate: req.body.endDate
   });

   await assignment.save().then((result)=>{
     res.status(200).json({
       success: "success",
       data: result
     })
   }).catch(err=>{
     res.status(400).send(err);
   })
});

route.post('/save/reports',middleware, async (req,res)=>{

  const new_reports = {
    nickname: req.body.nickname,
    points: req.body.points
  }
  await Assignment.findOneAndUpdate(
    { _id: req.body.assignmentId },
    { $push: { participant: new_reports  } }
  ).then((response)=>{
    res.status(200).send("success");
  }).catch(err=>{
    console.log(err)
  })

})

module.exports = route;