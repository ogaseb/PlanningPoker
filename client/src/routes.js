const routes = {
  root: () => "/",
  join: () => "/join",
  jira: () => "/jira",
  room: (roomName,id) => `/room/${roomName}/${id}`,
}

export default routes
