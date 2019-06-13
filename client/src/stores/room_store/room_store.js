import {types, getRoot} from 'mobx-state-tree'
import Card from 'models/card_result'
import Users from 'models/users'
import sortBy from 'lodash/sortBy'

const RoomStore = types
  .model('roomStore', {
    roomName: types.optional(types.string, ''),
    roomPassword: types.optional(types.string, ''),
    roomId: types.optional(types.string, ''),
    roomUsers: types.optional(types.array(Users), []),
    cardResults: types.optional(types.array(Card), []),
    cardHistory: types.optional(types.array(types.array(Card)), []),
    cardsAreTheSame: types.optional(types.boolean, false),
    waiting: types.optional(types.array(types.boolean), []),
    blockCard: types.optional(types.boolean, false),
    blockReset: types.optional(types.boolean, false),
    selectedCard: types.union(
      types.maybe(types.string),
      types.maybe(types.number)
    )
  })
  .views(self => ({
    get isRoomCreated() {
      return !!self.roomName
    }
  }))
  .actions(self => ({
    createRoom(userName, roomName, roomPassword, boardId) {
      const {
        userStore: {setUserName, userId},
        socketStore: {socket}
      } = getRoot(self)
      setUserName(userName)
      localStorage.setItem('userName', JSON.stringify(userName))
      socket.emit('createRoom', {
        userName,
        roomName,
        roomPassword,
        userId: userId ? userId : false,
        boardId
      })
    },
    joinRoom(userName, roomId, roomPassword) {
      const {
        socketStore: {socket},
        userStore: {userId}
      } = getRoot(self)
      localStorage.setItem('userName', JSON.stringify(userName))
      // this.user.connected = true
      socket.emit('joinRoom', {
        userName,
        roomId,
        roomPassword,
        userId: userId ? userId : false
      })
    },
    deleteRoom(roomPassword, roomId) {
      const {
        socketStore: {socket},
        userStore: {userId}
      } = getRoot(self)
      if (roomId) {
        socket.emit('deleteRoom', {
          roomId,
          userId
        })
      }
      if (roomPassword) {
        socket.emit('deleteRoom', {
          roomId: self.roomId,
          roomPassword
        })
      }
    },
    editRoom(roomName, roomPassword, boardId, roomId) {
      const {
        socketStore: {socket},
        userStore: {userId}
      } = getRoot(self)
      socket.emit('editRoom', {
        roomId,
        userId,
        roomName: !!roomName ? roomName : false,
        roomPassword: !!roomPassword ? roomPassword : false,
        boardId
      })

    },
    sendCard() {
      const {
        socketStore: {socket},
        userStore: {userId, userName}
      } = getRoot(self)
      socket.emit('sendCard', {
        roomId: self.roomId,
        userId,
        userName,
        cardValue: self.selectedCard
      })
      self.setSelectedCard('')
    },
    resetCards() {
      const {
        socketStore: {socket}
      } = getRoot(self)

      socket.emit('resetCards', {roomId: self.roomId})
    },
    initialize() {
      const {
        userStore: {setSocketId, setAdmin, setConnected, fetchUserRooms},
        socketStore: {socket, openNotification},
        jiraStore: {setDescription, setTitle, setBoardId, selectBoard}
      } = getRoot(self)
      socket.on('createRoom', ({user, roomId, roomName, userId}) => {
        if (userId === 'guest') {
          setSocketId(user[user.length - 1].socketId)
          setAdmin(true)
          setConnected(true)
          self.setRoomId(roomId)
          self.setRoomName(roomName)
        }
        openNotification('You have created a Room', 'success')
      })
      socket.on('joinRoom', ({user, roomId, roomName, gameHistory, boardId}) => {
        setConnected(true)
        setSocketId(user[user.length - 1].socketId)
        self.setRoomId(roomId)
        self.setRoomName(roomName)
        self.setCardHistory(gameHistory || [])
        console.log("boardId: " + boardId)
        setBoardId(boardId)
        selectBoard()
        openNotification('You have joined to the Room', 'success')
      })
      socket.on('fetchRoomUsers', response => {
        console.table(response)
        self.setRoomUsers(response)
      })
      socket.on('sendCard', response => {
        self.clearWaiting()
        if (response) {
          self.setBlockReset(false)
          let card = sortBy(response, 'cardValue')

          const allEqual = arr =>
            arr.every(v => v.cardValue === arr[0].cardValue)
          self.setCardsAreTheSame(allEqual(card))

          if (!self.cardsAreTheSame) {
            card[card.length - 1].color = card[0].color = '#E33B3B'
            self.setCardResult(card)
          } else {
            for (let i = 0; i < card.length; i++) {
              card[i].color = '#37C26D'
            }
            self.setCardResult(card)
          }
        }
      })
      socket.on('waitingFor', response => {
        if (response && self.cardResults.length === 0) {
          self.clearWaiting()

          for (let i = 0; i < response; i++) {
            self.pushWaiting()
          }
        }
      })
      socket.on('resetCards', data => {
        self.setBlockReset(true)
        self.setCardResult([])
        self.setBlockCard(false)
        self.setCardsAreTheSame(false)
        setDescription('')
        setTitle('')
        openNotification('Card reset', 'info')
        if (data) {
          self.setCardHistory(data)
        }
      })
      socket.on('deleteRoom', () => {
        fetchUserRooms()
        openNotification('Room is removed', 'info')
      })
    },
    setRoomId(value) {
      self.roomId = value
    },
    setRoomPassword(value) {
      self.roomPassword = value
    },
    setSelectedCard(value) {
      self.selectedCard = value
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
