const rooms = [];

const addRooms = ({author ,id, room }) => {
    room = room.toString();
    const existingRoom = rooms.find((admin) => admin.room === room);

    if(existingRoom) return { error: 'This room already created' };
    const roomAdmin = { author, id, room };
    rooms.push(roomAdmin);
    return { roomAdmin };
  }

  const findAdmin = (room)=>{
    const admin = rooms.find((admin)=> admin.room === room);
    if(!admin){
        return {error: "Game pin not valid!"};
    }else{
        return { success: "game pin is valid" };
    }
  }


  const getAdminByRoom = (room) => rooms.find((admin)=> admin.room === room);
  const getAdmin = (id) => rooms.find((admin) => admin.id === id);

  const removeAdmin = (id) => {
    const index = rooms.findIndex((admin) => admin.id === id);
    if(index !== -1) return rooms.splice(index, 1)[0];
  }

 



module.exports = { addRooms, findAdmin, getAdmin , getAdminByRoom,removeAdmin};