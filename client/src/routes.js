const routes = {
  root: () => '/',
  rooms: () => '/rooms',
  create: () => '/create',
  jira: () => '/jira',
  join: () => '/join',
  error: () => '/error',
  room: (roomName, id) => `/room/${roomName}/${id}`
}

export default routes
