import {decorate, observable} from "mobx";
import socketIOClient from "socket.io-client";

class UserStore {
  constructor() {
    this.user = {
      userName: "",
      userId: "",
      users: [],
      kicked: false,
      connected: false,
      admin: false
    }

    this.room = {
      roomName: "",
      roomId: "",
      rooms: [],
      cardResults: [],
      waiting: 0
    }

    this.jira = {
      jiraBoards: [],
      activeBoard: {
        issues: []
      },
      title: "",
      description: "",
      jiraLoggedIn: false,
      issueId:"",
      boardId:"",
      estimationScore: ""
    }

    this.notificationMessage = null
    this.notificationVariant = "info"
    this.blockCard = false
    this.openJoinDialog = false
    this.socket = socketIOClient(process.env.ENDPOINT);
    this.socket.on("sendCard", (response) => {
      this.room.cardResults = response
    });
    this.socket.on("waitingFor", (response) => {
      this.room.waiting = response
    });
    this.socket.on("resetCards", () => {
      this.room.cardResults = []
      this.blockCard = false
      this.jira.description = this.jira.title = ""
    });
    this.socket.on("kickUser", (data) => {
      if (this.user.userId !== "" && this.user.userId === data.userId) {
        this.user.kicked = true
        this.user.admin = this.user.connected = this.openJoinDialog = false;
        this.user.userName = this.room.roomName = this.user.userId = this.room.roomId = ""
        this.notificationVariant = "error"
        this.notificationMessage = "You have been kicked from the Room"
      }
    })
    this.socket.on("changeAdmin", (data) => {
      if (this.user.userId === data) {
        this.user.admin = true
        this.notificationVariant = "info"
        this.notificationMessage = "You have been given admin privileges"
      }
    })
    this.socket.on("broadcastTitle", (title) => {
      this.jira.title = title
    })
    this.socket.on("broadcastDescription", (description) => {
      this.jira.description = description
    })
    this.socket.on("error", (description) => {
      this.notificationVariant = "warning"
      this.notificationMessage = description
    })
  }

  createRoom(userName, roomName, roomPassword) {
    this.user.userName = userName;
    localStorage.setItem('userName', JSON.stringify(userName));
    const data = {
      userName: this.user.userName,
      roomName,
      roomPassword: roomPassword
    };
    this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      this.user.userId = response.user[response.user.length - 1].userId;
      this.room.roomId = response.roomId;
      this.room.roomName = response.roomName
      this.openJoinDialog = false
      this.user.admin = true
      this.user.connected = true
      this.notificationVariant = "success"
      this.notificationMessage = "You have created a Room"
    });
  }

  fetchRooms() {
    this.socket.on("fetchRooms", (response) => {
      this.room.rooms = response;
    });
  }

  joinRoom(roomId, roomPassword, userName) {
    this.user.userName = userName;
    localStorage.setItem('userName', JSON.stringify(userName));
    const data = {
      userName: this.user.userName,
      roomId: roomId,
      roomPassword: roomPassword
    };
    this.socket.emit("joinRoom", data);
    this.socket.on("joinRoom", (response) => {
      this.user.userId = response.user[response.user.length - 1].userId;
      this.room.roomId = response.roomId;
      this.room.roomName = response.roomName
      this.jira.openJoinDialog = false
      this.user.connected = true
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
    const data = {
      jiraSubdomain: jiraSubdomain,
      jiraLogin: jiraLogin,
      jiraPassword: jiraPassword
    };
    this.socket.emit("jiraLogin", data)
    this.socket.on("jiraLogin", (data) => {
      this.jira.jiraLoggedIn = true
      this.jira.jiraBoards = data
    })
  }

  selectBoard(boardId) {
    this.socket.emit("jiraGetBoard", boardId)
    this.socket.on("jiraGetBacklogBoard", (data) => {
      this.jira.activeBoard.issues = []
      this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data.issues]
    })
    this.socket.on("jiraGetBoard", (data) => {
      this.jira.activeBoard.issues = []
      this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data.issues]
    })
  }

  setIssueEstimation() {
    const data = {
      issueId: this.jira.issueId,
      boardId: this.jira.boardId,
      estimationScore: this.jira.estimationScore
    };
    if (this.jira.issueId !== undefined) {
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
  openJoinDialog: observable
});

export default UserStore;
