import {types, getRoot} from "mobx-state-tree"

const UserStore = types
  .model("userStore", {
    userName: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
    kicked: types.optional(types.boolean, false),
    userIsConnecting: types.optional(types.boolean, false),
    connected: types.optional(types.boolean, false),
    admin: types.optional(types.boolean, false)
  })
  .views(self => ({
    get isConnected() {
      return self.connected
    }
  }))
  .actions(self => ({
    kickUser(userId) {
      const {socketStore: {socket}} = getRoot(self)
      socket.emit("kickUser", {userId, userLeaved: false})
    },
    changeAdmin() {
      const {socketStore: {socket}} = getRoot(self)
      socket.emit("changeAdmin", {userId: self.userId})
    },
    initialize(){
      const {socketStore: {socket, openNotification}} = getRoot(self)
      socket.on("kickUser", (data) => {
        if (data){
          if (self.userId !== "" && self.userId === data.userId) {
            self.setKicked(true)
            self.setAdmin(false)
            self.setConnected(false)
            setTimeout(()=>{
              self.setKicked(false)
            }, 3000)
            openNotification("You have been kicked from the Room", "error")
          }
        }
      });
      socket.on("changeAdmin", (data) => {
        if (data){
          if (self.userId === data && self.admin === false) {
            self.setAdmin(true)
            openNotification("You have been given admin privileges", "info")
          }
        }
      });
    },
    leaveRoom() {
      const {socketStore: {socket, openNotification}} = getRoot(self)
      socket.emit("kickUser", {userId : self.userId, userLeaved: true})
      self.setAdmin(false)
      self.setConnected(false)
      openNotification("You have leaved the room", "info")
    },
    onCreateRoom(userName) {
      self.userName = userName
    },
    setUserName(value) {
      self.userName = value
    },
    setUserId(value) {
      self.userId = value
    },
    setUserIsConnecting(value) {
      self.userIsConnecting = value
    },
    setConnected(value) {
      self.connected = value
    },
    setKicked(value) {
      self.kicked = value
    },
    setAdmin(value) {
      self.admin = value
    },
  }))

export default UserStore
