const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const crypto = require('crypto');
const lodash = require('lodash');


const port = 5000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let rooms = []
let rooms_password = []

io.on('connection', socket => {

  console.log('User connected', socket.id)
  socket.on('createRoom', (data) => {
    const room = {
      roomName: "",
      roomId: "",
      user: []
    }
    console.log(data)
    const RoomId = crypto.createHash('md5').update(data.roomName).digest("hex");
    room.roomId = RoomId;
    room.user.push({userId: socket.id, userName: data.userName})
    room.roomName = data.roomName;
    const room_pass = {
      roomId: RoomId,
      roomPassword: data.roomPassword
    }
    rooms_password.push(room_pass)
    rooms.push(room)
    socket.join(RoomId);
    socket.emit("createRoom", rooms)
    socket.emit("fetchRooms", rooms)
    console.log("userCreatedRoom!")
  })

  socket.on('joinRoom', (data) => {
    const index = lodash.findIndex(rooms_password, (o) => { return o.roomId === data.roomId; });
    if (index !== -1 ){
      if (data.roomPassword === rooms_password[index].roomPassword){
        rooms[index].user.push({userId: socket.id, userName: data.userName})
        socket.join(data.roomId);
        console.log("userJoined!")
        io.in(data.roomId).emit("hello",rooms[index].user)
      }
    }
    // console.log(lodash.findIndex(rooms_password, (o) => { return o.roomId === data.roomId; }));
    // console.log(data)
  })

  setInterval(() => {
    socket.emit("fetchRooms", rooms)
  }, 1000)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))