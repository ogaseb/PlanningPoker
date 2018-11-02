import React from 'react'
import {decorate, observable} from "mobx";
import socketIOClient from "socket.io-client";

class UserStore {
  constructor() {
    this.userName = ""
    this.roomName = ""
    this.rooms = [];
    this.jira = {jiraBoards: [], activeBoard: {issues:[]}};
    this.cardResults = [];
    this.users = [];
    this.admin = false;
    this.kicked = false
    this.connected = false
    this.notificationMessage = null
    this.notificationVariant = "info"
    this.blockCard = false
    this.openJoinDialog = false
    this.jiraLoggedIn = false
    this.socket = socketIOClient(process.env.ENDPOINT);
    this.socket.on("sendCard", (response) => {
      this.cardResults = response
    });
    this.socket.on("waitingFor", (response) => {
      this.waiting = response
    });
    this.socket.on("resetCards", () => {
      this.cardResults = []
      this.blockCard = false
      this.description = ""
      this.title = ""

    });
    this.socket.on("kickUser", (data) => {
      if (this.userId !== "" && this.userId === data.userId) {
        this.kicked = true
        this.admin = false;
        this.connected = false
        this.userName = ""
        this.roomName = ""
        this.userId = ""
        this.roomId = ""
        this.openJoinDialog = false
        this.notificationVariant = "error"
        this.notificationMessage = "You have been kicked from the Room"
      }
    })
    this.socket.on("changeAdmin", (data) => {
      console.log(data)
      if (this.userId === data) {
        this.admin = true
        this.notificationVariant = "info"
        this.notificationMessage = "You have been given admin privileges"
      }
    })
    this.socket.on("broadcastTitle", (title) => {
      this.title = title
      console.log("gettin title", title)
    })
    this.socket.on("broadcastDescription", (description) => {
      this.description = description
      console.log("gettin description", description)
    })

  }

  createRoom(userName, roomName, roomPassword) {
    this.userName = userName;
    const data = {
      userName: this.userName,
      roomName,
      roomPassword: roomPassword
    };
    this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      this.userId = response.user[response.user.length - 1].userId;
      this.roomId = response.roomId;
      this.roomName = response.roomName
      this.openJoinDialog = false
      this.admin = true
      this.connected = true
      this.notificationVariant = "success"
      this.notificationMessage = "You have created a Room"
    });

  }

  fetchRooms() {
    this.socket.on("fetchRooms", (response) => {
      this.rooms = response;
    });
  }

  joinRoom(roomId, roomPassword, userName) {
    this.userName = userName;
    const data = {
      userName: this.userName,
      roomId: roomId,
      roomPassword: roomPassword
    };
    this.socket.emit("joinRoom", data);
    this.socket.on("joinRoom", (response) => {
      this.userId = response.user[response.user.length - 1].userId;
      this.roomId = response.roomId;
      this.roomName = response.roomName
      this.openJoinDialog = false
      this.connected = true
      this.notificationVariant = "success"
      this.notificationMessage = "You have joined to the Room"
    });
  }

  sendCard(card) {
    const data = {
      userName: this.userName,
      roomId: this.roomId,
      cardValue: card
    };
    this.socket.emit("sendCard", data);
  }

  resetCards() {
    const data = {
      roomId: this.roomId,
    };
    this.socket.emit("resetCards", data);

  }

  fetchUsers() {
    const data = {
      roomId: this.roomId,
    };
    this.socket.emit("fetchUsers", data)
    this.socket.on("fetchUsers", (response) => {
      this.users = response;
    });
  }

  kickUser(userId) {
    const data = {
      userId: userId,
    };
    this.socket.emit("kickUser", data)
  }

  changeAdmin(userId) {
    const data = {
      userId: userId,
    };
    this.socket.emit("changeAdmin", data)
  }

  broadcastTitle() {
    const data = {
      title: this.title,
      roomId: this.roomId,
    };
    this.socket.emit("broadcastTitle", data)
  }

  broadcastDescription() {
    const data = {
      description: this.description,
      roomId: this.roomId,
    };
    this.socket.emit("broadcastDescription", data)
  }

  jiraLogin(jiraSubdomain, jiraLogin, jiraPassword) {
    const data = {
      jiraSubdomain: jiraSubdomain,
      jiraLogin: jiraLogin,
      jiraPassword: jiraPassword
    };
    this.socket.emit("jiraLogin", data)
    this.socket.on("jiraLogin", (data) => {
      this.jiraLoggedIn = true
      this.jira.jiraBoards = data
    })
  }

  selectBoard(boardId) {
    this.socket.emit("jiraGetBoard", boardId)
    this.socket.on("jiraGetBoard", (data) => {
      this.jira.activeBoard = data
      console.log(this.jira.activeBoard)

    })

  }
}

decorate(UserStore, {
  userName: observable,
  userId: observable,
  roomName: observable,
  roomId: observable,
  socket: observable,
  rooms: observable,
  waiting: observable,
  cardResults: observable,
  users: observable,
  kicked: observable,
  admin: observable,
  connected: observable,
  notificationMessage: observable,
  notificationVariant: observable,
  blockCard: observable,
  openJoinDialog: observable,
  title: observable,
  description: observable,
  jiraLoggedIn: observable,
  jira: observable
});

export default UserStore;
