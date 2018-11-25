import express from "express"
import http from "http"
import fs from 'fs'
import socketIO from "socket.io"
import findIndex from "lodash/findIndex"
import path from "path"
import uuid from "uuid/v4"
import JiraClient from "jira-connector"
import date from "date-and-time"
import bcrypt from "bcrypt"
import {Client} from 'pg'
import Rollbar from 'rollbar'

let rollbar = new Rollbar({
  accessToken: 'ad6df4a89ab94a3591c267d78367ad3a',
  captureUncaught: true,
  captureUnhandledRejections: true
});


const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cookie: false
});

let fetchRoom = [];
let users = new Map();
let rooms = new Map();
let roomsPassword = new Map();
let jira;

function createHash() {
  return uuid()
}

function createRoomObject() {
  return (
    {
      roomName: "",
      roomId: "",
      timestamp: "",
      boardId: "",
      user: [],
      game: [],
      gameHistory: []
    }
  )
}

async function insertRoomToDb(roomName, hash, RoomId, timestamp) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',
  })
  client.connect()

  await client.query(`INSERT INTO rooms(roomName,roomPassword,roomId,timeStamp) VALUES('${roomName}', '${hash}', '${RoomId}', '${timestamp}')`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> save room");

      client.end()
    });
}

async function deleteRoomFromDb(roomId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

  })
  client.connect()

  await client.query(`DELETE FROM rooms WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> delete room");

      client.end()
    });
}

async function updateTimestampDb(roomId,timestamp) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

  })
  client.connect()

  await client.query(`UPDATE rooms SET timestamp = '${timestamp}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room timestamp");
      client.end()
    });
}

async function updateRoomBoardIdDb(roomId,boardId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

  })
  client.connect()

  await client.query(`UPDATE rooms SET roomboardid = '${boardId}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room boardId");

      client.end()
    });
}

async function updateRoomHistoryDb(roomId,history) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

  })
  client.connect()

  await client.query(`UPDATE rooms SET roomhistory = '${history}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room history");

      client.end()
    });
}

async function fetchRoomsfromDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

  })
  client.connect()
  try {
    const res = await client.query(`SELECT * FROM rooms`);
    client.end()
    res.rows.map(({roomname, roomid, roompassword, timestamp, roomhistory, roomboardid}) => {
      const Room = createRoomObject();
      Room.roomName = roomname;
      Room.roomId = roomid;
      Room.timestamp = timestamp;
      Room.gameHistory = JSON.parse(roomhistory);
      if (roomboardid){
        Room.boardId = roomboardid;
      }
      roomsPassword.set(roomid, roompassword);
      rooms.set(roomid, Room);
    })
  }
  catch (e) {
    console.log(e)
  }

}
fetchRoomsfromDb()


io.on("connection", socket => {
  console.log("User -> connected to server id:", socket.id);

  function fetchRooms() {
    socket.emit("fetchRooms", fetchRoom)
  }

  socket.on("jiraLogin", ({jiraLogin: username, jiraPassword: password, jiraSubdomain}) => {
    jira = new JiraClient({
      host: `${jiraSubdomain}.atlassian.net`,
      basic_auth: {username, password}
    });
    if (jira) {
      jira.board.getAllBoards({startAt: 0}, function (error, boards) {
        socket.emit("jiraLogin", boards);
        console.log("Jira -> connecting and fetching boards", error);
        if (error) {
          socket.emit("errors", {error})
        }
      })
    }
  });

  socket.on("jiraGetBoard", (boardId) => {
    jira.board.getIssuesForBacklog({boardId}, function (error, board) {
      let sendBoard = [];
      for (let i = 0; i < board.issues.length; i++) {
        sendBoard.push(
          {
            id: board.issues[i].id,
            key: board.issues[i].key,
            summary: board.issues[i].fields.summary,
            description: board.issues[i].fields.description,
            comments: board.issues[i].fields.comment.comments,
            priorityType: board.issues[i].fields.priority.name,
            priorityUrl: board.issues[i].fields.priority.iconUrl,
            issueUrl: board.issues[i].fields.issuetype.iconUrl
          }
        )
      }
      socket.emit("jiraGetBacklogBoard", sendBoard);
      console.log("Jira -> fetching singe board");
      if (error) {
        socket.emit("errors", {error})
      }

    });

    jira.board.getIssuesForBoard({boardId}, function (error, board) {
      let sendBoard = [];
      for (let i = 0; i < board.issues.length; i++) {
        sendBoard.push(
          {
            id: board.issues[i].id,
            key: board.issues[i].key,
            summary: board.issues[i].fields.summary,
            description: board.issues[i].fields.description,
            comments: board.issues[i].fields.comment.comments,
            priorityType: board.issues[i].fields.priority.name,
            priorityUrl: board.issues[i].fields.priority.iconUrl,
            issueUrl: board.issues[i].fields.issuetype.iconUrl
          }
        )
      }
      socket.emit("jiraGetBoard", sendBoard);
      console.log("Jira -> fetching singe board");
      if (error) {
        socket.emit("errors", {error})
      }
    })
  });

  socket.on("jiraSetEstimation", ({issueId, boardId, estimationScore}) => {
    jira.issue.setIssueEstimation({issueId, boardId, value: estimationScore}, function (error) {
      console.log(`Jira -> setting estimation for id: ${issueId} value: ${estimationScore}`);
      if (error) {
        socket.emit("errors", {error})
      }
    })
  });

  socket.on("createRoom", ({userName, roomName, roomPassword}) => {
    const Room = createRoomObject();
    const RoomId = createHash();
    let timestamp = new Date();
    timestamp = date.format(timestamp, "YYYY/MM/DD HH:mm:ss");

    Room.user.push({userId: socket.id, userName});
    Room.roomName = roomName;
    Room.roomId = RoomId;
    Room.timestamp = timestamp;
    bcrypt.hash(roomPassword, 10, (err, hash) => {
      roomsPassword.set(RoomId, hash);
      insertRoomToDb(roomName, hash, RoomId, timestamp)
      if (err) {
        socket.emit("errors", {error: err})
      }
    });
    // console.log(roomsPassword.get(RoomId))

    rooms.set(RoomId, Room);
    users.set(socket.id, RoomId);
    fetchRoom.push(Room);
    socket.join(RoomId);

    socket.emit("createRoom", Room);
    io.in(RoomId).emit("waitingFor", Room.game.length);
    console.log("User -> Created room! RoomId:", RoomId)
  });

  socket.on("saveBoardId", ({roomId, boardId }) => {
    updateRoomBoardIdDb(roomId, boardId)
    console.log("User -> Created room! RoomId:", RoomId)
  });

  setInterval(() => {
    fetchRooms()
  }, 1000);

  socket.on("joinRoom", ({roomId, roomPassword, userName}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId);
      console.log(temp_room)
      const password = roomsPassword.get(roomId);
      bcrypt.compare(roomPassword, password, function (err, res) {
        if (res) {
          let timestamp = new Date();
          timestamp = date.format(timestamp, "YYYY/MM/DD HH:mm:ss");
          temp_room.timestamp = timestamp
          updateTimestampDb(roomId, timestamp)
          temp_room.user.push({userId: socket.id, userName});

          users.set(socket.id, roomId);
          socket.join(roomId);

          let index = findIndex(temp_room, function (o) {
            return o.roomId === roomId;
          });

          if (index !== -1) {
            fetchRoom[index].user.push({userId: socket.id, userName})
          }

          console.log("User -> Joined room! RoomId:", roomId);
          socket.emit("joinRoom", temp_room);

          rooms.set(roomId, temp_room);
          io.in(roomId).emit("waitingFor", temp_room.game.length)

          if (temp_room.user.length === 1) {
            io.in(roomId).emit("changeAdmin", temp_room.user[0].userId)
          }
          console.log(temp_room)

        } else {
          // Passwords don't match
          socket.emit("errors", {error: "Invalid Password"})
        }
      });
    } else {
      socket.emit("errors", {error: "Room not found"})
    }
  });

  socket.on("deleteRoom", ({roomId, roomPassword}) => {
    if (roomsPassword.has(roomId)) {
      const password = roomsPassword.get(roomId);
      bcrypt.compare(roomPassword, password, function (err, res) {
        if (res) {
          let index = findIndex(fetchRoom, function (o) {
            return o.roomId === roomId;
          });
          fetchRoom.splice(index, 1);
          rooms.delete(roomId)
          deleteRoomFromDb(roomId)
          socket.emit("deleteRoom")
          console.log("User -> Deleted room! RoomId:", roomId);
        } else {
          socket.emit("errors", {error: "Invalid Password (delete)"})
        }
      });
    }
  });

  socket.on("sendCard", ({roomId, userName, cardValue}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId);
      temp_room.game.push({userName, cardValue});

      let index = findIndex(temp_room.user, function (o) {
        return o.userName === userName;
      });

      temp_room.user[index].userName = `${temp_room.user[index].userName} - ✔`;

      if (temp_room.user.length === temp_room.game.length) {
        io.in(roomId).emit("sendCard", temp_room.game);
        io.in(roomId).emit("waitingFor", temp_room.game.length)
      } else {
        io.in(roomId).emit("waitingFor", temp_room.game.length)
      }
      rooms.set(roomId, temp_room)
    }
  });

  socket.on("resetCards", ({roomId}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId);
      for (let i = 0; i < temp_room.user.length; i++) {
        let splitted = temp_room.user[i].userName.split(" - ");
        temp_room.user[i].userName = splitted[0]
      }

      temp_room.gameHistory.push(temp_room.game);
      io.in(roomId).emit("resetCards", temp_room.gameHistory);
      const gameHistoryDb = JSON.stringify(temp_room.gameHistory)
      updateRoomHistoryDb(roomId, gameHistoryDb)
      temp_room.game = [];
      temp_room.title = "";
      temp_room.description = "";

      io.in(roomId).emit("waitingFor", temp_room.game.length);
      rooms.set(roomId, temp_room)
    }
  });

  socket.on("fetchUsers", ({roomId}) => {
      if (rooms.has(roomId)) {
        const temp_room = rooms.get(roomId);
        io.in(roomId).emit("fetchUsers", temp_room.user);
        if (temp_room.user.length === 1) {
          io.in(roomId.toString()).emit("changeAdmin", temp_room.user[0].userId)
        }
      }
  });

  socket.on("kickUser", ({userId}) => {
    if (users.has(userId)) {
      let roomId = users.get(userId);

      let temp_room = rooms.get(roomId.toString());
      let index = findIndex(temp_room.user, function (o) {
        return o.userId === userId;
      });
      if (index !== -1) {
        io.in(roomId.toString()).emit("kickUser", temp_room.user[index]);

        temp_room.user.splice(index, 1);
        io.in(roomId.toString()).emit("waitingFor", temp_room.game.length);
        if (temp_room.user.length === 1) {
          io.in(roomId.toString()).emit("changeAdmin", temp_room.user[0].userId)
        }
        rooms.set(roomId.toString(), temp_room);
        console.log("User -> kicked")
      }
    } else {
      socket.emit("errors", {error: "Cant find user you trying to kick"})

    }

  });

  socket.on("changeAdmin", ({userId}) => {
    if (users.has(userId)) {
      let roomId = users.get(userId);

      let temp_room = rooms.get(roomId.toString());
      let index = findIndex(temp_room.user, function (o) {
        return o.userId === userId;
      });
      if (index !== -1) {
        io.in(roomId.toString()).emit("changeAdmin", temp_room.user[index].userId);
        console.log("User -> admin permissions given")
      }
    } else {
      socket.emit("errors", {error: "Cant find user you trying to give admin"})
    }

  });

  socket.on("broadcastTitle", ({roomId, title}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId);
      if (temp_room.title !== title) {
        temp_room.title = title;
        socket.broadcast.to(roomId).emit("broadcastTitle", title);
        rooms.set(roomId, temp_room)
      }
    }
  });

  socket.on("broadcastDescription", ({roomId, description}) => {
    if (rooms.has(roomId)) {
      let temp_room = rooms.get(roomId);
      if (temp_room.description !== description) {
        temp_room.description = description;
        socket.broadcast.to(roomId).emit("broadcastDescription", description);
        rooms.set(roomId, temp_room)
      }
    }
  });

  socket.on("disconnect", () => {
    if (users.has(socket.id)) {
      let userId = users.get(socket.id);

      if (rooms.has(userId.toString())) {
        let temp_room = rooms.get(userId.toString());
        let index = findIndex(temp_room.user, function (o) {
          return o.userId === socket.id;
        });
        if (index !== -1) {
          temp_room.user.splice(index, 1);
          io.in(userId.toString()).emit("waitingFor", temp_room.game.length);
          if (temp_room.user.length === 1) {
            io.in(userId.toString()).emit("changeAdmin", temp_room.user[0].userId)
          }
          rooms.set(userId.toString(), temp_room);
          console.log("User -> disconnected from room")
        }
      }
    }
    console.log("User -> disconnected from server")
  });

  socket.on("disconnecting", (reason) => {
    console.log("User -> disconnecting reason:", reason)
  });

  socket.on("reconnecting", (reason) => {
    console.log("User -> lost connection in process of reconnection reason:", reason)
  });
  socket.on("reconnect", () => {
    console.log("User -> user reconnected")
  });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/room/*/:uuid', function (req, res, next) {
  const {uuid} = req.params
  console.log("Room not found!: ", uuid)
  if (rooms.has(uuid)) {
    next()
  } else {
    const index = fs.readFileSync(path.join(__dirname, 'client/build/index.html'), 'utf-8');
    const body = index.replace('</body>', `
      <script>
        window.__ROOM_NOT_FOUND__ = true
      </script>
    </body>`)

    res.status(404).send(body)
  }
})

app.get('*', function (req, res) {
  res.sendFile("index.html", {root: path.join(__dirname, 'client/build')})
});

server.listen(port, () => console.log(`Listening on port ${port}`));