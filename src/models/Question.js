const express = require('express');
const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({

    question:{
        type:String,
        required:true
    },
    tropicsId:{
        type:mongoose.Schema.Types.ObjectId
    },
    answer:{
        type:String,
        required:true
    },
    options:[
        {
            qop:String,
            option:String,
            isCorrect:Boolean
        },
        {
            qop:String,
            option:String,
            isCorrect:Boolean
        },
        {
            qop:String,
            option:String,
            isCorrect:Boolean
        },
        {
            qop:String,
            option:String,
            isCorrect:Boolean
        }
    ]
},{timestamps:true});

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;
