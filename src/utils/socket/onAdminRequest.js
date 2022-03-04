const {addRooms,removeAdmin} = require('../services/rooms');
module.exports = (io) => {
    const createGameRoom = function(payload,callback){
        const socket = this;
        const {error,roomAdmin} = addRooms({author: payload.author, id:socket.id, room:payload.room});
        if(error){
            callback(error);
        }else{
            socket.join(roomAdmin.room);
            callback("success");
        }
    }

    const disconnectAdmin = function(){
        const socket = this;
        const admin = removeAdmin(socket.id);
        
        if(admin) {
         io.to(admin.room).emit('admin_left');
        }
    }



    return{
        createGameRoom,
        disconnectAdmin
    }

}