import {types, getRoot} from "mobx-state-tree"
import Card from "models/card_result";
import Users from "models/users";
import sortBy from "lodash/sortBy";

const RoomStore = types
  .model("roomStore", {
    roomName: types.optional(types.string, ""),
    roomId: types.optional(types.string, ""),
    roomUsers: types.optional(types.array(Users), []),
    cardResults: types.optional(types.array(Card), []),
    cardHistory: types.optional(types.array(types.array(Card)), []),
    cardsAreTheSame: types.optional(types.boolean, false),
    waiting: types.optional(types.array(types.boolean), []),
    blockCard: types.optional(types.boolean, false),
    blockReset: types.optional(types.boolean, false)
  })
  .views(self => ({
    get isRoomCreated() {
      return !!self.roomName
    },
  }))
  .actions(self => ({
    createRoom(userName, roomName, roomPassword) {
      const {userStore: {setUserName}, socketStore: {socket}} = getRoot(self)
      setUserName(userName)
      localStorage.setItem("userName", JSON.stringify(userName));
      // setConnected(true)
      socket.emit("createRoom", {
        userName,
        roomName,
        roomPassword
      });
    },
    joinRoom(userName, roomId, roomPassword) {
      const {socketStore: {socket}} = getRoot(self)

      localStorage.setItem("userName", JSON.stringify(userName));
      // this.user.connected = true
      socket.emit("joinRoom", {
        userName,
        roomId,
        roomPassword
      });

    },
    deleteRoom(roomPassword) {
      const {socketStore: {socket}} = getRoot(self)
      socket.emit("deleteRoom", {
        roomId: self.roomId,
        roomPassword
      });
    },
    sendCard(card) {
      const {socketStore: {socket}, userStore: {userId, userName}} = getRoot(self)
      socket.emit("sendCard", {
        roomId: self.roomId,
        userId,
        userName,
        cardValue: card
      });
    },
    resetCards() {
      const {socketStore: {socket}} = getRoot(self)

      socket.emit("resetCards", {roomId: self.roomId});
    },
    initialize() {
      const {userStore: {setUserId, setAdmin, setConnected}, socketStore: {socket, openNotification}, jiraStore: {setDescription, setTitle}} = getRoot(self)
      socket.on("createRoom", ({user, roomId, roomName}) => {
        setUserId(user[user.length - 1].userId);
        setAdmin(true);
        setConnected(true)
        self.setRoomId(roomId)
        self.setRoomName(roomName)
        openNotification("You have created a Room", "success")
      });
      socket.on("joinRoom", ({user, roomId, roomName, gameHistory}) => {
        setConnected(true)
        setUserId(user[user.length - 1].userId)
        self.setRoomId(roomId)
        self.setRoomName(roomName)
        self.setCardHistory(gameHistory || [])
        // setBoardId(boardId)
        openNotification("You have joined to the Room", "success")
        // if (response.boardId) {
        //   this.selectBoard(this.jira.boardId)
        // }
        // this.fetchUsers()
      });
      socket.on("fetchRoomUsers", (response) => {
        self.setRoomUsers(response)
      });
      socket.on("sendCard", (response) => {
        self.clearWaiting()
        if (response) {
          self.setBlockReset(false)
          let card = sortBy(response, "cardValue");
          const allEqual = arr => arr.every(v => v.cardValue === arr[0].cardValue);
          self.setCardsAreTheSame(allEqual(card))

          if (!self.cardsAreTheSame) {
            card[card.length - 1].color = card[0].color = "#E33B3B";
            self.setCardResult(card)
          } else {
            for (let i = 0; i < card.length; i++) {
              card[i].color = "#37C26D"
            }
            self.setCardResult(card)
          }
        }
      });
      socket.on("waitingFor", (response) => {
        if (response && self.cardResults.length === 0) {
          self.clearWaiting()

          for (let i = 0; i < response; i++) {
            self.pushWaiting()
          }
        }
      });
      socket.on("resetCards", (data) => {
        self.setBlockReset(true)
        self.setCardResult([])
        self.setBlockCard(false)
        self.setCardsAreTheSame(false)
        setDescription("")
        setTitle("")
        openNotification("Card reset", "info")
        if (data) {
          self.setCardHistory(data)
        }
      });
      socket.on("deleteRoom", () => {
        window.location.href = "/"
      });
    },
    setRoomId(value) {
      self.roomId = value
    },
    clearWaiting() {
      self.waiting = []
    },
    pushWaiting() {
      self.waiting.push(true)
    },
    setRoomName(value) {
      self.roomName = value
    },
    setRoomUsers(value) {
      self.roomUsers = value
    },
    setCardHistory(value) {
      self.cardHistory = value
    },
    setBlockReset(value) {
      self.blockReset = value
    },
    setBlockCard(value) {
      self.blockCard = value
    },
    setCardsAreTheSame(value) {
      self.cardsAreTheSame = value
    },
    setCardResult(value) {
      self.cardResults = value
    }
  }))

export default RoomStore
