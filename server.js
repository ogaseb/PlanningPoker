const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const lodash = require('lodash');
const crypto = require('crypto')

const port = 5000
const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  // below are engine.IO options
  pingInterval: 60000,
  pingTimeout: 60000,
  cookie: false
})

let fetch_rooms = []
let users = new Map()
let rooms = new Map()
let rooms_password = new Map()

function createRoomHash(roomName) {
  const current_date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  return crypto.createHash('sha1').update(current_date + random + roomName).digest('hex');
}

function createRoomObject() {
  return (
    {
      roomName: "",
      roomId: "",
      user: [],
      game: []
    }
  );
}

io.on('connection', socket => {
  console.log('User connected', socket.id)

  function fetchRooms() {
    socket.emit("fetchRooms", fetch_rooms)
  }

  socket.on('createRoom', (data) => {
    const Room = createRoomObject();
    const RoomId = createRoomHash(data.roomName);


    Room.user.push({userId: socket.id, userName: data.userName})
    users.set(socket.id, RoomId)
    Room.roomName = data.roomName;
    Room.roomId = RoomId;
    rooms.set(RoomId, Room)
    fetch_rooms.push(Room)
    Room.roomName = data.roomName;

    rooms_password.set(RoomId, data.roomPassword)

    socket.emit("createRoom", Room)
    socket.join(RoomId);
    io.in(RoomId).emit("waitingFor", Room.user.length - Room.game.length)
    console.log("userCreatedRoom! RoomId: ", RoomId)
  })

  setInterval(() => {
    fetchRooms()
  }, 1000)

  socket.on('joinRoom', (data) => {
    const password = rooms_password.get(data.roomId)
    if (data.roomPassword === password) {
      let rooms_temp = rooms.get(data.roomId)
      console.log(rooms_temp)
      rooms_temp.user.push({userId: socket.id, userName: data.userName})
      users.set(socket.id, data.roomId)

      socket.join(data.roomId);

      let index = lodash.findIndex(rooms_temp, function (o) {
        return o.roomId === data.roomId;
      });

      if(index !== -1){
        fetch_rooms[index].user.push({userId: socket.id, userName: data.userName})
      }

      console.log("userJoined! RoomId: ", data.roomId)
      socket.emit('joinRoom', rooms_temp)

      rooms.set(data.roomId, rooms_temp)
      io.in(data.roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    }
    else {
      socket.emit("error", "Invalid password")
    }
  })

  socket.on("sendCard", (data) => {
    let rooms_temp = rooms.get(data.roomId)
    rooms_temp.game.push({userName: data.userName, cardValue: data.cardValue})
    if (rooms_temp.user.length === rooms_temp.game.length) {
      io.in(data.roomId).emit("sendCard", rooms_temp.game)
      io.in(data.roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    } else {
      io.in(data.roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    }
    rooms.set(data.roomId, rooms_temp)
  })

  socket.on("resetCards", (data) => {
    let rooms_temp = rooms.get(data.roomId)
    while (rooms_temp.game.length) {
      rooms_temp.game.pop();
    }
    io.in(data.roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    io.in(data.roomId).emit("resetCards")
    rooms.set(data.roomId, rooms_temp)
  })

  socket.on("fetchUsers", (data) => {

    setInterval(() => {
      if (data) {
        const temp_room = rooms.get(data.roomId)
        if (temp_room) {
          io.in(data.roomId).emit("fetchUsers", temp_room.user)
          if (temp_room.user.length === 0) {
            let index = lodash.findIndex(fetch_rooms, function (o) {
              return o.roomId === data.roomId;
            });
            fetch_rooms.splice(index, 1)
            rooms.delete(data.roomId)
            console.log("Room deleted!")
          }
        }
      }

    }, 1000)
  })

  socket.on('kickUser', (data) => {
    let roomId = users.get(data.userId)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === data.userId;
      });
      if (index !== -1){
        io.in(roomId.toString()).emit("kickUser", room_temp.user[index])

        room_temp.user.splice(index, 1)
        io.in(roomId.toString()).emit("waitingFor", room_temp.user.length - room_temp.game.length)
        if (room_temp.user.length === 1){
          io.in(roomId.toString()).emit("changeAdmin", room_temp.user[0].userId)
        }
        rooms.set(roomId.toString(), room_temp)
        console.log('user kicked')
      }
    }
  })

  socket.on('changeAdmin', (data) =>{
    let roomId = users.get(data.userId)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === data.userId;
      });
      if(index !== -1){
        io.in(roomId.toString()).emit("changeAdmin", room_temp.user[index].userId)
        console.log('admin permissions given')
      }
    }
  })

  socket.on('disconnect', () => {
    let roomId = users.get(socket.id)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      console.log(room_temp)
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === socket.id;
      });
      if (index !== -1) {
        room_temp.user.splice(index, 1)
        if (room_temp.user.length === 1){
          io.in(roomId.toString()).emit("changeAdmin", room_temp.user[0].userId)
        }
        rooms.set(roomId.toString(), room_temp)
        console.log('user disconnected from room')
      }
    }
    console.log('user disconnected from server')
  })

  socket.on('disconnecting', (reason) => {
    console.log(reason)
  });
})

server.listen(port, () => console.log(`Listening on port ${port}`))