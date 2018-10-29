const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const crypto = require('crypto');

const port = 5000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let rooms = []
io.on('connection', socket => {

  console.log('User connected', socket.id)
  socket.on('createRoom', (data) => {
    const room = {
      roomPassword:"",
      roomName: "",
      roomId: "",
      user: []
    }
    console.log(data)
    const RoomId = crypto.createHash('md5').update(data.roomName).digest("hex");
    socket.join(RoomId);
    room.roomId = RoomId;
    room.user.push({userId: socket.id, userName: data.userName})
    room.roomName = data.roomName;
    room.roomPassword = data.roomPassword;
    rooms.push(room)
    socket.emit("createRoom", rooms)
  })

  setInterval(() => {
    socket.emit("fetchRooms", rooms)
  }, 5000)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))