const routes = {
  root: () => "/",
  room: (id, password) => `/room/${id}/${password}`,
}

export default routes
