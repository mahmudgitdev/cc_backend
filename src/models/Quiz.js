const express = require('express');
const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    questions:{
        type:Array
    },
    isAssign:{
        type:Boolean
    }
    // questions:[
    //     {
    //         question:String,
    //         image:String,
    //         option1:String,
    //         option2:String,
    //         option3:String,
    //         option4:String,
    //         answer:String
    //     }
    // ]

},{timestamps:true});

const Quiz = mongoose.model('Quiz',quizSchema);

module.exports = Quiz;
