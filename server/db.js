import {Client} from "pg/lib";
import {createRoomObject} from "./helpers";

module.exports = {
  insertRoomToDb: async function (roomName, hash, RoomId, timestamp) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',
    })
    await client.connect()
    await client.query(`INSERT INTO rooms(roomName,roomPassword,roomId,timeStamp) VALUES('${roomName}', '${hash}', '${RoomId}', '${timestamp}')`,
      (err, res) => {
        console.log(err, res);
        console.log("DB -> save room");
        client.end()
      });
  },
  deleteRoomFromDb: async function (roomId) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

    })
    await client.connect()
    await client.query(`DELETE FROM rooms WHERE roomId = '${roomId}'`,
      (err, res) => {
        console.log(err, res);
        console.log("DB -> delete room");

        client.end()
      });
  },
  updateTimestampDb: async function (roomId, timestamp) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

    })
    await client.connect()
    await client.query(`UPDATE rooms SET timestamp = '${timestamp}' WHERE roomId = '${roomId}'`,
      (err, res) => {
        console.log(err, res);
        console.log("DB -> update room timestamp");
        client.end()
      });
  },
  updateRoomBoardIdDb: async function (roomId, boardId) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

    })
    await client.connect()
    await client.query(`UPDATE rooms SET roomboardid = '${boardId}' WHERE roomId = '${roomId}'`,
      (err, res) => {
        console.log(err, res);
        console.log("DB -> update room boardId");

        client.end()
      });
  },
  updateRoomHistoryDb:
    async function (roomId, history) {
      const client = new Client({
        connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',

      })
      await client.connect()
      await client.query(`UPDATE rooms SET roomhistory = '${history}' WHERE roomId = '${roomId}'`,
        (err, res) => {
          console.log(err, res);
          console.log("DB -> update room history");
          client.end()
        });
    },
  fetchRoomsFromDb: async function (roomsPassword, rooms) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek',
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
}



