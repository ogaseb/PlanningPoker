import uuid from 'uuid/v4'

export function createHash () {
  return uuid()
}

export function createRoomObject (
  roomName,
  roomId,
  userId,
  roomTimestamp,
  boardId,
  user,
  game,
  gameHistory
) {
  return {
    roomName: roomName || '',
    roomId: roomId || '',
    userId: userId ? userId : 'guest',
    timestamp: roomTimestamp || '',
    boardId: boardId || '',
    user: user || [],
    game: game || [],
    gameHistory: gameHistory || []
  }
}
