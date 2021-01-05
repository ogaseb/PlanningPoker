const routes = {
  root: () => "/",
  jira: () => "/jira",
  join: () => "/join",
  error: () => "/error",
  room: (roomName,id) => `/room/${roomName}/${id}`,
}

export default routes
