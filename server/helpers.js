import uuid from "uuid/v4";

module.exports = {
  createHash: function () {
    return uuid()
  },
  createRoomObject: function () {
    return (
      {
        roomName: "",
        roomId: "",
        timestamp: "",
        boardId: "",
        user: [],
        game: [],
        gameHistory: []
      }
    )
  }
}

