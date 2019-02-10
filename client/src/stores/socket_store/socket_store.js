import { types } from 'mobx-state-tree'
import socketIOClient from 'socket.io-client'

const SocketStore = types
  .model('socketStore', {
    notificationMessage: types.maybeNull(types.string),
    notificationVariant: types.optional(
      types.enumeration('Variant', ['error', 'warning', 'info', 'success']),
      'info'
    )
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
      self.socket = socketIOClient(process.env.ENDPOINT)
      self.socket.on('errors', description => {
        if (description) {
          self.openNotification(description.error, 'error')
        }
      })
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
