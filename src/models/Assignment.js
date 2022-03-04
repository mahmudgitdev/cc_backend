const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    randomOrder:{
        type:Boolean
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    participant:{
        type:Array
    },
    endDate:{
        type:Date
    }


},{timestamps:true});

const Assignment = mongoose.model('Assignment',assignmentSchema);

module.exports = Assignment;
