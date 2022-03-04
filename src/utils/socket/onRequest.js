const { addPlayer, getPlayer, getPlayerInRoom, removePlayer, getRoomAdmin } = require('../services/players');
const { findAdmin, getAdmin, getAdminByRoom } = require('../services/rooms');
module.exports = (io) => {


    const joinGameRoom = function (payload,callback) {
        const socket = this;
        const {error,player} = addPlayer({id:socket.id, name:payload.name, room:payload.gamepin});
        if(error){
            callback({error});
        }else{
        socket.join(player.room);
        socket.broadcast.to(player.room).emit('new_player',player);
        callback({player})
        }
    };



    const gettingReady = function(){
        const socket = this;
        const admin = getAdmin(socket.id);
        io.to(admin.room).emit('getting_ready');
    }

    const startGame = function(payload){
        const socket = this;
        const admin = getAdmin(socket.id);
        io.to(admin.room).emit('game_is_running',(payload));
    }

    const newQuestion = function(payload){
        const socket = this;
        const admin = getAdmin(socket.id);
        io.to(admin.room).emit('new_question_accept',(payload));
    }

    const submitAnswer = function(payload){
        const socket = this;
        const player = getPlayer(socket.id);
        const admin = getAdminByRoom(player.room);
        const data = {
            id: player.id,
            name: player.name,
            points: payload.points,
            answer: payload.answer
        }
        io.to(admin.id).emit('accept_answer',({data}));
    }

    const finalResult = function(result){
        const socket = this;
        const admin = getAdmin(socket.id);
        io.to(admin.room).emit('accept_result',(result));
    }

    const disconnectPlayer = function(){
        const socket = this;
        const player = removePlayer(socket.id);
        
        if(player) {
        // io.to(player.room).emit('message', { user: 'Admin', text: `${player.name} has left.` });
        io.to(player.room).emit('roomData', { room: player.room, players: getPlayerInRoom(player.room)});
        }
    }

    const checkGameRoom = function(payload,callback){
        const {error} = findAdmin(payload);
        if(error){
            callback(error);
        }else{
            callback("success");
        }
    }

  
    return {
        joinGameRoom,
        gettingReady,
        newQuestion,
        startGame,
        submitAnswer,
        finalResult,
        disconnectPlayer,
        checkGameRoom
    }
  }