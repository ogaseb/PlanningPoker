const routes = {
  root: () => "/",
  join: () => "/join",
  jira: () => "/jira",
  error: () => "/error",
  room: (roomName,id) => `/room/${roomName}/${id}`,
}

export default routes
