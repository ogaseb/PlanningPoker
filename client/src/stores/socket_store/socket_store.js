import { types } from 'mobx-state-tree'
import socketIOClient from 'socket.io-client'

const SocketStore = types
  .model('socketStore', {
    notificationMessage: types.maybeNull(types.string),
    notificationVariant: types.optional(
      types.enumeration('Variant', ['error', 'warning', 'info', 'success']),
      'info'
    ),
    disconnected: types.optional(types.boolean, false)
  })
  .volatile(() => ({
    socket: undefined
  }))
  .views(self => ({
    get isSocket () {
      return !!self.socket
    }
  }))
  .actions(self => ({
    initialize () {
      self.socket = socketIOClient(process.env.ENDPOINT, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999
      })
      self.socket.on('errors', description => {
        if (description) {
          self.openNotification(description.error, 'error')
        }
      })
      self.socket.on('connect', res => {
        self.setDisconnected(false)
      })
      self.socket.on('disconnect', res => {
        self.setDisconnected(true)
      })
    },
    setDisconnected (value) {
      self.disconnected = value
    },
    openNotification (message, variant) {
      self.notificationMessage = message
      self.notificationVariant = variant
    },
    closeNotification () {
      self.notificationMessage = null
    }
  }))

export default SocketStore
