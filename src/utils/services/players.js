const players = [];

const addPlayer = ({author ,id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.toString();
  const existingUser = players.find((player) => player.room === room && player.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username already exits in this room.' };
  const player = { author, id, name, room };
  players.push(player);
  return { player };
}

const removePlayer = (id) => {
  const index = players.findIndex((player) => player.id === id);
  if(index !== -1) return players.splice(index, 1)[0];
}

const getPlayer = (id) => players.find((player) => player.id === id);

const getRoomAdmin = (room) => {
  const admin = players.find((player) => player.room === room && player.name === "roomadmin0304");
  return admin;
}

const getPlayerInRoom = (room) => players.filter((player) => player.room === room);

module.exports = { addPlayer, removePlayer, getPlayer, getPlayerInRoom, getRoomAdmin };