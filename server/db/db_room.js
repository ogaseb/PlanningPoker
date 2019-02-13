require('dotenv').config()
import { Client } from 'pg/lib'

export async function fetchRoomsFromDb () {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  try {
    const res = await client.query(`SELECT * FROM rooms`)
    client.end()
    return res
  } catch (e) {
    console.log(e)
  }
}

export async function fetchUserRoomsFromDb (userId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  try {
    const res = await client.query(
      `SELECT * FROM rooms WHERE user_id = '${userId}'`
    )
    console.log('DB -> fetch user rooms room')
    await client.end()
    return res
  } catch (e) {
    console.log(e)
  }
}

export async function insertRoomToDb (
  roomName,
  hash,
  RoomId,
  timestamp,
  userId
) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  try {
    await client.connect()
    await client.query(
      `INSERT INTO rooms(room_name,room_password,room_id,room_timestamp,user_id) VALUES('${roomName}', '${hash}', '${RoomId}', '${timestamp}', '${userId}')`
    )
    console.log('DB -> save room')
    await client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function deleteRoomFromDb (roomId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  try {
    await client.connect()
    await client.query(`DELETE FROM rooms WHERE room_id = '${roomId}'`)
    console.log('DB -> delete room')
    await client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function updateTimestampDb (roomId, timestamp) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  try {
    await client.connect()
    await client.query(
      `UPDATE rooms SET room_timestamp = '${timestamp}' WHERE room_id = '${roomId}'`
    )
    console.log('DB -> update room timestamp')
    client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function updateRoomBoardIdDb (roomId, boardId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  try {
    await client.connect()
    await client.query(
      `UPDATE rooms SET room_board_id = '${boardId}' WHERE room_id = '${roomId}'`
    )
    console.log('DB -> update room boardId')
    client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function updateRoomHistoryDb (roomId, history) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  try {
    await client.connect()
    await client.query(
      `UPDATE rooms SET room_history = '${history}' WHERE room_id = '${roomId}'`
    )
    console.log('DB -> update room history')
    client.end()
  } catch (e) {
    console.log(e)
  }
}
