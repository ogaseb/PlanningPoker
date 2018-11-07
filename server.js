const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const lodash = require('lodash');
const path = require('path');
const uuid = require('uuid/v4');
const JiraClient = require('jira-connector');

const port = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  cookie: false
})

let fetch_rooms = []
let users = new Map()
let rooms = new Map()
let rooms_password = new Map()
let jira

function createHash() {
  return uuid()
}

function createRoomObject() {
  return (
    {
      roomName: "",
      roomId: "",
      user: [],
      game: [],
      gameHistory: []
    }
  );
}

io.on('connection', socket => {
  console.log('User -> connected to server id:', socket.id)

  function fetchRooms() {
    socket.emit("fetchRooms", fetch_rooms)
  }

  socket.on('jiraLogin', ({jiraLogin: username, jiraPassword: password, jiraSubdomain}) => {
    jira = new JiraClient({
      host: `${jiraSubdomain}.atlassian.net`,
      basic_auth: {username, password}
    })

    jira.board.getAllBoards({startAt: 0}, function (error, boards) {
      socket.emit("jiraLogin", boards)
      console.log('Jira -> connecting and fetching boards', error)
      if (error) {
        socket.emit("errors", {error})
      }
    })
  })

  socket.on('jiraGetBoard', (boardId) => {
    jira.board.getIssuesForBacklog({boardId}, function (error, board) {
      socket.emit("jiraGetBacklogBoard", board)
      console.log('Jira -> fetching singe board')
      if (error) {
        socket.emit("errors", {error})
      }

    })

    jira.board.getIssuesForBoard({boardId}, function (error, board) {
      socket.emit("jiraGetBoard", board)
      console.log('Jira -> fetching singe board')
      if (error) {
        socket.emit("errors", {error})
      }
    })
  })

  socket.on('jiraSetEstimation', ({issueId, boardId, estimationScore}) => {
    jira.issue.setIssueEstimation({issueId, boardId, value: estimationScore}, function (error) {
      console.log(`Jira -> setting estimation for id: ${issueId} value: ${estimationScore}`)
      if (error) {
        socket.emit("errors", {error})
      }
    })
  })

  socket.on('createRoom', ({userName, roomName, roomPassword}) => {
    const Room = createRoomObject();
    const RoomId = createHash();

    Room.user.push({userId: socket.id, userName})
    Room.roomName = roomName;
    Room.roomId = RoomId;

    rooms_password.set(RoomId, roomPassword)
    rooms.set(RoomId, Room)
    users.set(socket.id, RoomId)
    fetch_rooms.push(Room)
    socket.join(RoomId);

    socket.emit("createRoom", Room)
    io.in(RoomId).emit("waitingFor", Room.user.length - Room.game.length)
    console.log("User -> Created room! RoomId:", RoomId)
  })

  setInterval(() => {
    fetchRooms()
  }, 1000)

  socket.on('joinRoom', ({roomId, roomPassword, userName}) => {
    const password = rooms_password.get(roomId)

    if (roomPassword === password) {
      let rooms_temp = rooms.get(roomId)
      rooms_temp.user.push({userId: socket.id, userName})

      users.set(socket.id, roomId)
      socket.join(roomId);

      let index = lodash.findIndex(rooms_temp, function (o) {
        return o.roomId === roomId;
      });

      if (index !== -1) {
        fetch_rooms[index].user.push({userId: socket.id, userName})
      }

      console.log("User -> Joined room! RoomId:", roomId)
      socket.emit('joinRoom', rooms_temp)

      rooms.set(roomId, rooms_temp)
      io.in(roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    }
    else {
      socket.emit("errors", {error: "Invalid Password"})
    }
  })

  socket.on("deleteRoom", ({roomId, roomPassword}) => {
    const password = rooms_password.get(roomId)
    if (roomPassword === password) {
      let index = lodash.findIndex(fetch_rooms, function (o) {
        return o.roomId === roomId;
      });
      fetch_rooms.splice(index, 1)
      rooms.delete(roomId)
    } else {
      socket.emit("errors", {error: "Invalid Password"})
    }
  })

  socket.on("sendCard", ({roomId, userName, cardValue}) => {
    let rooms_temp = rooms.get(roomId)
    rooms_temp.game.push({userName, cardValue})

    let index = lodash.findIndex(rooms_temp.user, function (o) {
      return o.userName === userName;
    });

    rooms_temp.user[index].userName = `${rooms_temp.user[index].userName} - ✔`

    if (rooms_temp.user.length === rooms_temp.game.length) {
      io.in(roomId).emit("sendCard", rooms_temp.game)
      io.in(roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    } else {
      io.in(roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
    }
    rooms.set(roomId, rooms_temp)
  })

  socket.on("resetCards", ({roomId}) => {
    let rooms_temp = rooms.get(roomId)
    if (rooms_temp !== undefined) {

      for (let i = 0; i < rooms_temp.user.length; i++) {
        let splitted = rooms_temp.user[i].userName.split(" - ")
        rooms_temp.user[i].userName = splitted[0]
      }

      while (rooms_temp.game.length) {
        rooms_temp.game.pop();
      }
      rooms_temp.title = ""
      rooms_temp.description = ""

      io.in(roomId).emit("waitingFor", rooms_temp.user.length - rooms_temp.game.length)
      io.in(roomId).emit("resetCards")
      rooms.set(roomId, rooms_temp)
    }
  })

  socket.on("fetchUsers", ({roomId}) => {
    setInterval(() => {
        const temp_room = rooms.get(roomId)
        if (temp_room) {
          io.in(roomId).emit("fetchUsers", temp_room.user)
        }
    }, 1000)
  })

  socket.on('kickUser', ({userId}) => {
    let roomId = users.get(userId)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === userId;
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

  socket.on('changeAdmin', ({userId}) => {
    let roomId = users.get(userId)
    if (roomId) {
      let room_temp = rooms.get(roomId.toString())
      let index = lodash.findIndex(room_temp.user, function (o) {
        return o.userId === userId;
      });
      if (index !== -1) {
        io.in(roomId.toString()).emit("changeAdmin", room_temp.user[index].userId)
        console.log('User -> admin permissions given')
      }
    }
  })

  socket.on('broadcastTitle', ({roomId,title}) => {
    let room_temp = rooms.get(roomId)
    if (room_temp.title !== title) {
      room_temp.title = title
      socket.broadcast.to(roomId).emit("broadcastTitle", title)
      rooms.set(roomId, room_temp)
    }
  })

  socket.on('broadcastDescription', ({roomId, description}) => {
    let room_temp = rooms.get(roomId)
    if (room_temp.description !== description) {
      room_temp.description = description
      socket.broadcast.to(roomId).emit("broadcastDescription", description)
      rooms.set(roomId, room_temp)
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
    console.log("User -> disconnecting reason:", reason)
  });

  socket.on('reconnecting', (reason) => {
    console.log("User -> lost connection in process of reconnection reason:", reason)
  });
  socket.on('reconnect', () => {
    console.log("User -> user reconnected")
  });
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`))