import { types, getRoot } from 'mobx-state-tree'

const UserStore = types
  .model('userStore', {
    userName: types.optional(types.string, ''),
    socketId: types.optional(types.string, ''),
    userId: types.optional(types.string, ''),
    userEmail: types.optional(types.string, ''),
    userRooms: types.frozen(),
    kicked: types.optional(types.boolean, false),
    userIsConnecting: types.optional(types.boolean, false),
    connected: types.optional(types.boolean, false),
    admin: types.optional(types.boolean, false),
    guest: types.optional(types.boolean, false),
    loggedIn: types.optional(types.boolean, false)
  })
  .views(self => ({
    get isConnected () {
      return self.connected
    }
  }))
  .actions(self => ({
    kickUser (socketId) {
      const {
        socketStore: { socket }
      } = getRoot(self)
      socket.emit('kickUser', { socketId, userLeaved: false })
    },
    changeAdmin () {
      const {
        socketStore: { socket }
      } = getRoot(self)
      socket.emit('changeAdmin', { socketId: self.socketId })
    },
    initialize () {
      const {
        socketStore: { socket, openNotification }
      } = getRoot(self)
      socket.on('kickUser', data => {
        if (data) {
          if (self.socketId !== '' && self.socketId === data.socketId) {
            self.setKicked(true)
            self.setAdmin(false)
            self.setConnected(false)
            setTimeout(() => {
              self.setKicked(false)
            }, 3000)
            openNotification('You have been kicked from the Room', 'error')
          }
        }
      })
      socket.on('changeAdmin', data => {
        if (data) {
          if (self.socketId === data && self.admin === false) {
            self.setAdmin(true)
            openNotification('You have been given admin privileges', 'info')
          }
        }
      })
      socket.on('fetchUserRooms', data => {
        if (data) {
          self.setUserRooms(data.rows)
        }
      })
    },
    leaveRoom () {
      const {
        socketStore: { socket, openNotification }
      } = getRoot(self)
      socket.emit('kickUser', { socketId: self.socketId, userLeaved: true })
      self.setAdmin(false)
      self.setConnected(false)
      openNotification('You have leaved the room', 'info')
    },
    loginUser (userId, userName, userEmail) {
      self.userName = userName
      self.userId = userId
      self.userEmail = userEmail
      self.loggedIn = true
      console.log('loggedIn')
    },
    logout () {
      self.loggedIn = false
      self.userName = ''
      self.userId = ''
      self.userEmail = ''
    },
    fetchUserRooms () {
      const {
        socketStore: { socket }
      } = getRoot(self)
      if (self.userId) {
        socket.emit('fetchUserRooms', { userId: self.userId })
      }
    },
    onCreateRoom (userName) {
      self.userName = userName
    },
    setUserName (value) {
      self.userName = value
    },
    setSocketId (value) {
      self.socketId = value
    },
    setUserRooms (value) {
      self.userRooms = value
    },
    setUserIsConnecting (value) {
      self.userIsConnecting = value
    },
    setConnected (value) {
      self.connected = value
    },
    setKicked (value) {
      self.kicked = value
    },
    setAdmin (value) {
      self.admin = value
    }
  }))

export default UserStore
