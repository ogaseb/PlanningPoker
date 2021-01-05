import uuid from "uuid/v4";

export function createHash() {
  return uuid()
};

export function createRoomObject() {
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
};

