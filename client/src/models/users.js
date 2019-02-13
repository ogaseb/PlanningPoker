import { types } from 'mobx-state-tree'

const Users = types.model('Users', {
  userName: types.maybe(types.string),
  socketId: types.maybe(types.string)
})

export default Users
