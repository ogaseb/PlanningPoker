import {decorate, observable} from "mobx";
import socketIOClient from "socket.io-client";
import sortBy from "lodash/sortBy"
import React from "react";

class UserStore {
  constructor() {
    this.user = {
      userName: "",
      userId: "",
      users: [],
      kicked: false,
      userIsConnecting:false,
      connected: false,
      admin: false
    };

    this.room = {
      roomName: "",
      roomId: "",
      rooms: [],
      cardResults: [],
      cardHistory: [],
      cardsAreTheSame: false,
      waiting: []
    };

    this.jira = {
      jiraBoardsFetching: false,
      jiraBoards: [],
      activeBoardFetching: false,
      activeBoard: {
        issues: []
      },
      title: "",
      description: "",
      jiraLoggedIn: false,
      issueId:"",
      boardId:"",
      estimationScore: ""
    };

    this.notificationMessage = null;
    this.notificationVariant = "info";
    this.blockCard = false;
    this.blockReset = true;
    this.openJoinDialog = false;
    this.socket = socketIOClient(process.env.ENDPOINT);

    this.socket.on("sendCard", (response) => {
      this.room.waiting = [];
      if (response){
        this.blockReset = false;
        let card = sortBy(response, "cardValue");
        const allEqual = arr => arr.every( v => v.cardValue === arr[0].cardValue );
        this.room.cardsAreTheSame = allEqual( card );

        if (!this.room.cardsAreTheSame) {
          card[card.length -1].color =  card[0].color = "#E33B3B";
          this.room.cardResults = card
        }else {
          for (let i = 0; i < card.length; i++) {
            card[i].color = "#37C26D"
          }
          this.room.cardResults = card
        }
      }
    });

    this.socket.on("waitingFor", (response) => {
      if (response && this.room.cardResults.length === 0){
        this.room.waiting = [];
        for (let i = 0; i < response; i ++){
          this.room.waiting.push(true)
        }
      }
    });

    this.socket.on("resetCards", (data) => {
      this.blockReset = true;
      this.room.cardResults = [];
      this.blockCard = this.room.cardsAreTheSame = false;
      this.jira.description = this.jira.title = "";
      this.notificationVariant = "info";
      this.notificationMessage = "Card reset";
      if (data){
        this.room.cardHistory = data
      }

    });

    this.socket.on("kickUser", (data) => {
      if (data){
        if (this.user.userId !== "" && this.user.userId === data.userId) {
          this.user.kicked = true;
          this.user.admin = this.openJoinDialog = false;
          this.user.userName = this.room.roomName = this.user.userId = this.room.roomId = "";
          this.notificationVariant = "error";
          this.notificationMessage = "You have been kicked from the Room";
        }
      }
    });

    this.socket.on("changeAdmin", (data) => {
      if (data){
        if (this.user.userId === data && this.user.admin === false) {
          this.user.admin = true;
          this.notificationVariant = "info";
          this.notificationMessage = "You have been given admin privileges";
        }
      }
    });

    this.socket.on("broadcastTitle", (title) => {
      if (title){
        this.jira.title = title
      }
    });

    this.socket.on("broadcastDescription", (description) => {
      this.jira.description = description
    });

    this.socket.on("errors", (description) => {
      if (description){
        this.notificationVariant = "error";
        this.notificationMessage = description.error
        if (description.error === "Room not found") {

        }
      }
    })
  }

  createRoom(userName, roomName, roomPassword) {
    this.user.userName = userName;
    localStorage.setItem("userName", JSON.stringify(userName));
    const data = {
      userName: this.user.userName,
      roomName,
      roomPassword
    };
    this.openJoinDialog = false;
    this.user.connected = true;
    this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      this.user.userId = response.user[response.user.length - 1].userId;
      this.room.roomId = response.roomId;
      this.room.roomName = response.roomName;
      this.user.admin = true;
      this.notificationVariant = "success";
      this.notificationMessage = "You have created a Room";
    });
  }

  deleteRoom(roomId, roomPassword){
    const data = {
      roomId,
      roomPassword
    };
    this.socket.emit("deleteRoom", data);
  }

  fetchRooms() {
    this.socket.on("fetchRooms", (response) => {
      this.room.rooms = response;
    });
  }

  joinRoom(roomId, roomPassword, userName) {
    this.user.userName = userName;
    localStorage.setItem("userName", JSON.stringify(userName));
    const data = {
      userName: this.user.userName,
      roomId,
      roomPassword
    };
    this.openJoinDialog = false
    this.user.connected = true
    this.socket.emit("joinRoom", data);
    this.socket.on("joinRoom", (response) => {
      this.user.userId = response.user[response.user.length - 1].userId;
      this.room.roomId = response.roomId;
      this.room.roomName = response.roomName
      this.room.cardHistory = response.gameHistory
      this.notificationVariant = "success"
      this.notificationMessage = "You have joined to the Room"
    });
  }

  sendCard(card) {
    const data = {
      userName: this.user.userName,
      roomId: this.room.roomId,
      cardValue: card
    };
    this.socket.emit("sendCard", data);
  }

  resetCards() {
    const data = {
      roomId: this.room.roomId,
    };
    this.socket.emit("resetCards", data);

  }

  fetchUsers() {
    const data = {
      roomId: this.room.roomId,
    };
    this.socket.emit("fetchUsers", data)
    this.socket.on("fetchUsers", (response) => {
      this.user.users = response;
    });
  }

  kickUser(userId) {
    const data = {
      userId
    };
    this.socket.emit("kickUser", data)
  }

  changeAdmin(userId) {
    const data = {
      userId
    };
    this.socket.emit("changeAdmin", data)
  }

  broadcastTitle() {
    const data = {
      title: this.jira.title,
      roomId: this.room.roomId,
    };
    this.socket.emit("broadcastTitle", data)
  }

  broadcastDescription() {
    const data = {
      description: this.jira.description,
      roomId: this.room.roomId,
    };
    this.socket.emit("broadcastDescription", data)
  }

  jiraLogin(jiraSubdomain, jiraLogin, jiraPassword) {
    this.jira.jiraBoardsFetching = true
    const data = {
      jiraSubdomain,
      jiraLogin,
      jiraPassword
    };
    this.socket.emit("jiraLogin", data)
    this.socket.on("jiraLogin", (data) => {
      if (data){
        this.jira.jiraLoggedIn = true
        this.jira.jiraBoards = data
        this.jira.jiraBoardsFetching = false
      }
    })
  }

  selectBoard(boardId) {
    this.jira.activeBoardFetching = true
    this.socket.emit("jiraGetBoard", boardId)
    this.socket.on("jiraGetBacklogBoard", (data) => {
      this.jira.activeBoard.issues = []
      this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data]
      this.socket.on("jiraGetBoard", (data) => {
        this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data]
        this.jira.activeBoardFetching = false
      })
    })


  }

  setIssueEstimation() {
    const data = {
      issueId: this.jira.issueId,
      boardId: this.jira.boardId,
      estimationScore: this.room.cardResults[0].cardValue
    };
    if (this.jira.issueId) {
      this.socket.emit("jiraSetEstimation", data)
    }
  }
}

decorate(UserStore, {
  user: observable,
  room: observable,
  jira: observable,
  socket: observable,
  notificationMessage: observable,
  notificationVariant: observable,
  blockCard: observable,
  blockReset: observable,
  openJoinDialog: observable
});

export default UserStore;
