const routes = {
  root: () => "/",
  join: () => "/join",
  jira: () => "/jira",
  notFound: () => "/404",
  room: (roomName,id) => `/room/${roomName}/${id}`,
}

export default routes
