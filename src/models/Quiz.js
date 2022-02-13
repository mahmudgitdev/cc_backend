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
},{timestamps:true});

const Quiz = mongoose.model('Quiz',quizSchema);

module.exports = Quiz;
