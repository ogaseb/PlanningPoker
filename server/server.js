require('dotenv').config()
import passport from 'passport'
import passportSetup from './config/passport_setup'
import cors from 'cors'
import express from 'express'
import http from 'http'
import fs from 'fs'
import socketIO from 'socket.io'
import findIndex from 'lodash/findIndex'
import path from 'path'
import date from 'date-and-time'
import bcrypt from 'bcrypt'
import cookieSession from 'cookie-session'
import {initializeDb} from './models/database'
import Rollbar from 'rollbar'
import {
  insertRoomToDb,
  fetchRoomsFromDb,
  deleteRoomFromDb,
  updateRoomBoardIdDb,
  updateRoomHistoryDb,
  updateTimestampDb,
  fetchUserRoomsFromDb
} from './db/db_room'
import {createHash, createRoomObject} from './helpers/helpers'
import {
  jiraLogin,
  jiraGetBacklogIssues,
  jiraGetBoardIssues
} from './jira/jira'

import {editUserJira} from './db/db_user'

// let rollbar = new Rollbar({
//   accessToken: 'ad6df4a89ab94a3591c267d78367ad3a',
//   captureUncaught: true,
//   captureUnhandledRejections: true
// });

const port = process.env.PORT || 3001
const app = express()
app.use(cors())

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)

app.use(passport.initialize())
app.use(passport.session())

const server = http.createServer(app)
const io = socketIO(server, {
  cookie: false
})

let fetchRoom = []
let users = new Map()
let rooms = new Map()
let roomsPassword = new Map()

void (async function () {
  try {
    await initializeDb()
    console.log('DB -> init DB')

    const {rows} = await fetchRoomsFromDb()
    rows.map(
      ({
         room_name,
         room_id,
         user_id,
         room_password,
         room_timestamp,
         room_history,
         room_board_id
       }) => {
        const room = createRoomObject(
          room_name,
          room_id,
          user_id,
          room_timestamp,
          room_board_id,
          false,
          false,
          room_history
        )
        roomsPassword.set(room_id, room_password)
        rooms.set(room_id, room)
      }
    )
    console.log(rows)
    console.log('DB -> fetching rooms from DB')
  } catch (e) {
    console.log(e)
  }
})()

io.on('connection', socket => {
  console.log('User -> connected to server id:', socket.id)
  socket.on('jiraLogin', data => {
    console.log(data)
    editUserJira(
      data.jiraLogin,
      data.jiraPassword,
      data.jiraSubdomain,
      data.userId
    )
    jiraLogin(data)
      .then(boards => {
        socket.emit('jiraLogin', boards)
      })
      .catch(error => {
        socket.emit('errors', {error})
      })
  })

  socket.on('jiraGetBoard', async boardId => {
    console.log(boardId)
    try {
      const boardBacklog = await jiraGetBacklogIssues(boardId)
      console.log(boardBacklog)
      if (boardBacklog.issues.length > 0) {
        let sendBacklog = []
        for (let i = 0; i < boardBacklog.issues.length; i++) {
          sendBacklog.push({
            id: boardBacklog.issues[i].id,
            key: boardBacklog.issues[i].key,
            summary: boardBacklog.issues[i].fields.summary,
            description: boardBacklog.issues[i].fields.description,
            comments: boardBacklog.issues[i].fields.comment.comments,
            priorityType: boardBacklog.issues[i].fields.priority.name,
            priorityUrl: boardBacklog.issues[i].fields.priority.iconUrl,
            issueUrl: boardBacklog.issues[i].fields.issuetype.iconUrl
          })
        }

        socket.emit('jiraGetBacklogBoard', sendBacklog)
        console.log('Jira -> fetching backlog board')

        const boardIssues = await jiraGetBoardIssues(boardId)
        if (boardIssues.issues.length > 0) {
          let sendBoard = []
          for (let i = 0; i < boardIssues.issues.length; i++) {
            sendBoard.push({
              id: boardIssues.issues[i].id,
              key: boardIssues.issues[i].key,
              summary: boardIssues.issues[i].fields.summary,
              description: boardIssues.issues[i].fields.description,
              comments: boardIssues.issues[i].fields.comment.comments,
              priorityType: boardIssues.issues[i].fields.priority.name,
              priorityUrl: boardIssues.issues[i].fields.priority.iconUrl,
              issueUrl: boardIssues.issues[i].fields.issuetype.iconUrl
            })
          }
          socket.emit('jiraGetBoard', sendBoard)
          console.log('Jira -> fetching issues board')
        }
      }
    } catch (e) {
      socket.emit('errors', e)
    }
  })

  socket.on('createRoom', ({userName, roomName, roomPassword, userId, boardId}) => {
    const roomId = createHash()
    let timestamp = new Date()
    timestamp = date.format(timestamp, 'YYYY/MM/DD HH:mm:ss')

    bcrypt
      .hash(roomPassword, 10)
      .then(hash => {
        roomsPassword.set(roomId, hash)
        return insertRoomToDb(
          roomName,
          hash,
          roomId,
          timestamp,
          userId ? userId : 'guest',
          boardId ? boardId : null
        )
      })
      .then(() => {
        fetchUserRoomsFromDb(userId).then(response => {
          socket.emit('fetchUserRooms', response)
        })
      })
    const room = createRoomObject(
      roomName,
      roomId,
      userId,
      timestamp,
      boardId ? boardId : null,
      userId ? null : [{socketId: socket.id, userName}],
      null,
      null
    )
    rooms.set(roomId, room)
    fetchRoom.push(room)
    if (!userId) {
      users.set(socket.id, roomId)
      socket.join(roomId)
      io.in(roomId).emit('fetchRoomUsers', room.user)
      io.in(roomId).emit('waitingFor', room.game.length)
      console.log('User -> Created and joined the room! RoomId:', roomId)
    }
    socket.emit('createRoom', room)
    console.log('User -> Created room! RoomId:', roomId)
  })

  socket.on('saveBoardId', ({roomId, boardId}) => {
    updateRoomBoardIdDb(roomId, boardId)
    console.log('User -> Created room! RoomId:', roomId)
  })

  socket.on('joinRoom', ({roomId, roomPassword, userName, userId, boardId}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId)
      const password = roomsPassword.get(roomId)
      bcrypt.compare(roomPassword, password, function (err, res) {
        if (res) {
          let timestamp = new Date()
          timestamp = date.format(timestamp, 'YYYY/MM/DD HH:mm:ss')
          temp_room.timestamp = timestamp
          updateTimestampDb(roomId, timestamp)
          temp_room.user.push({socketId: socket.id, userName})
          // temp_room.boardId = boardId

          users.set(socket.id, roomId)
          socket.join(roomId)

          let index = findIndex(temp_room, function (o) {
            return o.roomId === roomId
          })

          if (index !== -1) {
            fetchRoom[index].user.push({socketId: socket.id, userName})
          }
          console.log('User -> Joinsed room! RoomId:', roomId)
          socket.emit('joinRoom', temp_room)

          rooms.set(roomId, temp_room)
          io.in(roomId).emit('waitingFor', temp_room.game.length)
          io.in(roomId).emit('fetchRoomUsers', temp_room.user)

          if (temp_room.user.length === 1 && temp_room.userId === userId) {
            io.in(roomId).emit('changeAdmin', temp_room.user[0].socketId)
          }
          if (temp_room.userId === userId) {
            io.in(roomId).emit('changeAdmin', temp_room.user[0].socketId)
          }

          console.log(temp_room)
        } else {
          // Passwords don't match
          socket.emit('errors', {error: 'Invalid Password'})
        }
      })
    } else {
      socket.emit('errors', {error: 'Room not found'})
    }
  })

  socket.on('editRoom', ({roomId, boardId, roomPassword, roomName, userId}) => {
    if (rooms.has(roomId)) {

    }
  })

  socket.on('deleteRoom', ({roomId, roomPassword, userId}) => {
    if (userId) {
      let index = findIndex(fetchRoom, function (o) {
        return o.roomId === roomId
      })
      fetchRoom.splice(index, 1)
      rooms.delete(roomId)
      deleteRoomFromDb(roomId)
      socket.emit('deleteRoom')
      console.log('User -> Deleted room! RoomId:', roomId)
    } else if (roomPassword && roomsPassword.has(roomId)) {
      const password = roomsPassword.get(roomId)
      bcrypt.compare(roomPassword, password, function (err, res) {
        if (res) {
          let index = findIndex(fetchRoom, function (o) {
            return o.roomId === roomId
          })
          fetchRoom.splice(index, 1)
          rooms.delete(roomId)
          deleteRoomFromDb(roomId)
          socket.emit('deleteRoom')
          console.log('User -> Deleted room! RoomId:', roomId)
        } else {
          socket.emit('errors', {error: 'Invalid Password (delete)'})
        }
      })
    }
  })

  socket.on('sendCard', ({roomId, socketId, userName, cardValue}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId)
      temp_room.game.push({userName, cardValue})

      let index = findIndex(temp_room.user, function (o) {
        return o.socketId === socketId
      })

      if (index !== -1) {
        temp_room.user[index].userName = `${temp_room.user[index].userName} - ✔`
        io.in(roomId).emit('fetchRoomUsers', temp_room.user)
      }

      if (temp_room.user.length === temp_room.game.length) {
        io.in(roomId).emit('sendCard', temp_room.game)
        io.in(roomId).emit('waitingFor', temp_room.game.length)
      } else {
        io.in(roomId).emit('waitingFor', temp_room.game.length)
      }
      rooms.set(roomId, temp_room)
    }
  })

  socket.on('resetCards', ({roomId}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId)
      for (let i = 0; i < temp_room.user.length; i++) {
        let splitted = temp_room.user[i].userName.split(' - ')
        temp_room.user[i].userName = splitted[0]
      }

      temp_room.gameHistory.push(temp_room.game)
      io.in(roomId).emit('resetCards', temp_room.gameHistory)
      io.in(roomId).emit('fetchRoomUsers', temp_room.user)

      const gameHistoryDb = JSON.stringify(temp_room.gameHistory)
      updateRoomHistoryDb(roomId, gameHistoryDb)
      temp_room.game = []
      temp_room.title = ''
      temp_room.description = ''

      io.in(roomId).emit('waitingFor', temp_room.game.length)
      rooms.set(roomId, temp_room)
    }
  })

  socket.on('fetchRoomUsers', ({roomId}) => {
    if (rooms.has(roomId)) {
      const temp_room = rooms.get(roomId)
      io.in(roomId).emit('fetchRoomUsers', temp_room.user)
      if (temp_room.user.length === 1) {
        io.in(roomId).emit('changeAdmin', temp_room.user[0].socketId)
      }
    }
  })

  socket.on('kickUser', ({socketId, userLeaved}) => {
    if (users.has(socketId)) {
      let roomId = users.get(socketId)

      let temp_room = rooms.get(roomId.toString())
      let index = findIndex(temp_room.user, function (o) {
        return o.socketId === socketId
      })
      if (index !== -1) {
        if (!userLeaved) {
          io.in(roomId).emit('kickUser', temp_room.user[index])
        }

        temp_room.user.splice(index, 1)
        io.in(roomId).emit('waitingFor', temp_room.game.length)
        io.in(roomId).emit('fetchRoomUsers', temp_room.user)

        if (temp_room.user.length === 1) {
          io.in(roomId).emit('changeAdmin', temp_room.user[0].socketId)
        }
        rooms.set(roomId, temp_room)
        console.log('User -> kicked')
      }
    } else {
      socket.emit('errors', {error: 'Cant find user you trying to kick'})
    }
  })

  socket.on('changeAdmin', ({socketId}) => {
    if (users.has(socketId)) {
      let roomId = users.get(socketId)

      let temp_room = rooms.get(roomId.toString())
      let index = findIndex(temp_room.user, function (o) {
        return o.socketId === socketId
      })
      if (index !== -1) {
        io.in(roomId).emit('changeAdmin', temp_room.user[index].socketId)
        console.log('User -> admin permissions given')
      }
    } else {
      socket.emit('errors', {
        error: 'Cant find user you trying to give admin'
      })
    }
  })

  socket.on('broadcastTitle', ({roomId, title}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId)
      if (temp_room.title !== title) {
        temp_room.title = title
        socket.broadcast.to(roomId).emit('broadcastTitle', title)
        rooms.set(roomId, temp_room)
      }
    }
  })

  socket.on('broadcastDescription', ({roomId, description}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId)
      if (temp_room.description !== description) {
        temp_room.description = description
        socket.broadcast.to(roomId).emit('broadcastDescription', description)
        rooms.set(roomId, temp_room)
      }
    }
  })

  socket.on('fetchUserRooms', ({userId}) => {
    fetchUserRoomsFromDb(userId).then(response => {
      socket.emit('fetchUserRooms', response)
    })
  })

  socket.on('disconnect', () => {
    if (users.has(socket.id)) {
      let socketId = users.get(socket.id)
      if (rooms.has(socketId)) {
        let temp_room = rooms.get(socketId)
        let index = findIndex(temp_room.user, function (o) {
          return o.socketId === socket.id
        })
        if (index !== -1) {
          temp_room.user.splice(index, 1)
          io.in(socketId).emit('waitingFor', temp_room.game.length)
          if (temp_room.user.length === 1) {
            io.in(socketId).emit('changeAdmin', temp_room.user[0].userId)
          }
          rooms.set(socketId, temp_room)
          console.log('User -> leave from room on disconnect')
        }
      }
    }
    console.log('User -> disconnected from server')
  })

  socket.on('disconnecting', reason => {
    console.log('User -> disconnecting reason:', reason)
  })

  socket.on('reconnecting', reason => {
    console.log(
      'User -> lost connection in process of reconnection reason:',
      reason
    )
  })
  socket.on('reconnect', () => {
    console.log('User -> user reconnected')
  })
})

app.use(express.static(path.join(__dirname, '../client/build')))

app.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

app.get('/login/google/redirect', passport.authenticate('google'), function (
  req,
  res
) {
  const data = `{userId: '${req.user.user_id}', userName: '${
    req.user.user_name
    }', userEmail: '${req.user.user_email}'}`
  res.send(`<script>  
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
    // Do we trust the sender of this message?
    if (event.origin !== "http://localhost:3000")
      return;
    event.source.postMessage(${data},event.origin);
    window.close()
    }
  </script>`)

  // res.send(req.user)
})

app.get('/room/*/:uuid', function (req, res, next) {
  const {uuid} = req.params
  console.log('Room not found!: ', uuid)
  if (rooms.has(uuid)) {
    next()
  } else {
    const index = fs.readFileSync(
      path.join(__dirname, '../client/build/index.html'),
      'utf-8'
    )
    const body = index.replace(
      '</body>',
      `
      <script>
        window.__ROOM_NOT_FOUND__ = true
      </script>
    </body>`
    )

    res.status(404).send(body)
  }
})

app.get('*', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build')})
})

server.listen(port, () => console.log(`Listening on port ${port}`))
