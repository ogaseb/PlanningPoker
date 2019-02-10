import { types } from 'mobx-state-tree'

const Users = types.model('Users', {
  userId: types.maybe(types.string),
  userName: types.maybe(types.string)
})

export default Users
