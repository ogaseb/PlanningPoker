import { types } from 'mobx-state-tree'
import UserStore from 'stores/user_store/user_store'
import SocketStore from 'stores/socket_store/socket_store'
import RoomStore from 'stores/room_store/room_store'
import JiraStore from 'stores/jira_store/jira_store'

const AppStore = types.model('store', {
  userStore: types.optional(UserStore, {}),
  socketStore: types.optional(SocketStore, {}),
  roomStore: types.optional(RoomStore, {}),
  jiraStore: types.optional(JiraStore, {})
})

export default AppStore
