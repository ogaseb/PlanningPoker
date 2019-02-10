require("dotenv").config()
import {Client} from "pg/lib";

export async function fetchRoomsFromDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect();
  try {
    const res = await client.query(`SELECT * FROM rooms`);
    client.end()
    return res;

  } catch (e) {
    console.log(e)
  }
}

export async function insertRoomToDb(roomName, hash, RoomId, timestamp, userId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(`INSERT INTO rooms(roomName,roomPassword,roomId,timeStamp, userId) VALUES('${roomName}', '${hash}', '${RoomId}', '${timestamp}', '${userId}')`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> save room");
      client.end()
    });
}

export async function deleteRoomFromDb(roomId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(`DELETE FROM rooms WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> delete room");

      client.end()
    });
}

export async function updateTimestampDb(roomId, timestamp) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(`UPDATE rooms SET timestamp = '${timestamp}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room timestamp");
      client.end()
    });
}

export async function updateRoomBoardIdDb(roomId, boardId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(`UPDATE rooms SET roomboardid = '${boardId}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room boardId");

      client.end()
    });
}

export async function updateRoomHistoryDb(roomId, history) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(`UPDATE rooms SET roomhistory = '${history}' WHERE roomId = '${roomId}'`,
    (err, res) => {
      console.log(err, res);
      console.log("DB -> update room history");
      client.end()
    });
}