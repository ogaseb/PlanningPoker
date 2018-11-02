const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const lodash = require('lodash');
const crypto = require('crypto')
const path = require('path');
const JiraClient = require('jira-connector');



const port = process.env.PORT || 5000;
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
let jira
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
  console.log('User -> connected to server id:', socket.id)

  function fetchRooms() {
    socket.emit("fetchRooms", fetch_rooms)
  }

  socket.on('jiraLogin', (data) => {
    jira = new JiraClient( {
      host: `${data.jiraSubdomain}.atlassian.net`,
      basic_auth: {
        username: `${data.jiraLogin}`,
        password: `${data.jiraPassword}`
      }
    })
    jira.board.getAllBoards({startAt:0}, function(error, boards) {
      socket.emit("jiraLogin", boards)
      console.log('Jira -> connecting and fetching boards', error)

    })
  })

  socket.on('jiraGetBoard', (data) => {
    jira.board.getIssuesForBacklog({boardId:data}, function(error, board) {
      socket.emit("jiraGetBoard", board)
      console.log('Jira -> fetching singe board', error)

    })
  })

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
    console.log("User -> Created room! RoomId:", RoomId)
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

      if (index !== -1) {
        fetch_rooms[index].user.push({userId: socket.id, userName: data.userName})
      }

      console.log("User -> Joined room! RoomId:", data.roomId)
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
    rooms_temp.title = ""
    rooms_temp.description = ""

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
            console.log("Server -> Room deleted! RoomId:", data.roomId)
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
      if (index !== -1) {
        io.in(roomId.toString()).emit("kickUser", room_temp.user[index])

        room_temp.user.splice(index, 1)
        io.in(roomId.toString()).emit("waitingFor", room_temp.user.length - room_temp.game.length)
        if (room_temp.user.length === 1) {
          io.in(roomId.toString()).emit("changeAdmin", room_temp.user[0].userId)
        }
        rooms.set(roomId.toString(), room_temp)
        console.log('User -> kicked')
      }
    }
  })

  socket.on('changeAdmin', (data) => {
    let roomId = users.get(data.userId)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === data.userId;
      });
      if (index !== -1) {
        io.in(roomId.toString()).emit("changeAdmin", room_temp.user[index].userId)
        console.log('User -> admin permissions given')
      }
    }
  })

  socket.on('broadcastTitle', (data) => {
    let room_temp = rooms.get(data.roomId)
    if (room_temp.title !== data.title) {
      room_temp.title = data.title
      socket.broadcast.to(data.roomId).emit("broadcastTitle", data.title)
      rooms.set(data.roomId, room_temp)
    }
  })

  socket.on('broadcastDescription', (data) => {
    let room_temp = rooms.get(data.roomId)
    if (room_temp.description !== data.description) {
      room_temp.description = data.description
      socket.broadcast.to(data.roomId).emit("broadcastDescription", data.description)
      rooms.set(data.roomId, room_temp)
    }
  })

  socket.on('disconnect', () => {
    let roomId = users.get(socket.id)
    if (roomId !== undefined) {
      let room_temp = rooms.get(roomId.toString())
      if (room_temp !== undefined) {
        let index = lodash.findIndex(room_temp.user, function (o) {
          return o.userId === socket.id;
        });
        if (index !== -1) {
          room_temp.user.splice(index, 1)
          io.in(roomId.toString()).emit("waitingFor", room_temp.user.length - room_temp.game.length)
          if (room_temp.user.length === 1) {
            io.in(roomId.toString()).emit("changeAdmin", room_temp.user[0].userId)
          }
          rooms.set(roomId.toString(), room_temp)
          console.log('User -> disconnected from room')
        }
      }
    }
    console.log('User -> disconnected from server')
  })

  socket.on('disconnecting', (reason) => {
    console.log("User -> disconnecting reason:",reason)
  });
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`))