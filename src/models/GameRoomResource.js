const mongoose = require('mongoose');
const GameRoomResourceSchema = new mongoose.Schema({

    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    gamepin:{
        type:String,
        required:true
    },
    participant:{
        type:Array
    }
},{timestamps:true});

const GameRoomResource = mongoose.model('GameRoomResource',GameRoomResourceSchema);

module.exports = GameRoomResource;
