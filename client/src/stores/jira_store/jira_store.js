import {getRoot, types} from "mobx-state-tree"

const JiraStore = types
  .model("JiraStore", {
    jiraLoggedIn: types.optional(types.boolean, false),
    jiraBoardsFetching: types.optional(types.boolean, false),
    jiraBoards: types.optional(types.frozen(), []),
    activeBoardFetching: types.optional(types.boolean, false),
    activeBoard: types.optional(types.frozen(), []),
    title: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    issueId: types.optional(types.string, ""),
    issueKey: types.optional(types.string, ""),
    boardId: types.optional(types.number, 0),
    estimationScore: types.optional(types.string, "")
  })
  .views(self => ({}))
  .actions(self => ({
    jiraLogin(jiraSubdomain, jiraLogin, jiraPassword) {
      const {socketStore: {socket}} = getRoot(self)
      self.setJiraBoardsFetching(true)
      socket.emit("jiraLogin", {
        jiraSubdomain,
        jiraLogin,
        jiraPassword
      })
    },
    saveBoardId(boardId) {
      const {socketStore: {socket}, roomStore: {roomId}} = getRoot(self)
      socket.emit("saveBoardId", {
        roomId,
        boardId,
      });
    },
    selectBoard() {
      const {socketStore: {socket}} = getRoot(self)
      self.setActiveBoardsFetching(true)
      socket.emit("jiraGetBoard", {boardId: self.boardId})

    },
    broadcastTitle() {
      const {socketStore: {socket}, roomStore: {roomId}} = getRoot(self)
      socket.emit("broadcastTitle", {title: self.title, roomId})
    },
    broadcastDescription() {
      const {socketStore: {socket}, roomStore: {roomId}} = getRoot(self)
      socket.emit("broadcastDescription", {description: self.description, roomId})
    },
    logout() {
      self.setJiraLoggedIn(false)
      self.jiraBoards = []
    },
    initialize() {
      const {socketStore: {socket}} = getRoot(self)
      socket.on("jiraLogin", (data) => {
        if (data) {
          self.setJiraLoggedIn(true)
          self.setJiraBoards(data)
          // console.log(self.jiraBoards)
          self.setJiraBoardsFetching(false)
        }
      })
      socket.on("broadcastTitle", (title) => {
        if (title) {
          self.setTitle(title)
        }
      });
      socket.on("broadcastDescription", (description) => {
        self.setDescription(description)
      });
      socket.on("jiraGetBacklogBoard", (data) => {
        self.setActiveBoard(data)
        // this.jira.activeBoard.issues = []
        // this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data]
      });
      socket.on("jiraGetBoard", (data) => {
        self.setActiveBoard(data)
        // this.jira.activeBoard.issues = [...this.jira.activeBoard.issues, ...data]
        // this.jira.activeBoardFetching = false
      })
    },
    setJiraLoggedIn(value) {
      self.jiraLoggedIn = value
    },
    setJiraBoardsFetching(value) {
      self.jiraBoardsFetching = value
    },
    setActiveBoardsFetching(value) {
      self.activeBoardFetching = value
    },
    setActiveBoard(value){
      self.activeBoard.concat(value)
    },
    setJiraBoards(value) {
      self.jiraBoards = value
    },
    setBoardId(value) {
      self.boardId = value
    },
    setTitle(value) {
      self.title = value
    },
    setDescription(value) {
      self.description = value
    },
    setIssueId(value) {
      self.issueId = value
    },
    setIssueKey(value) {
      self.issueKey = value
    }
  }))

export default JiraStore
