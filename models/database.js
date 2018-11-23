const {Client} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://sebastianogarek:@localhost:5432/sebastianogarek'
})
client.connect()

client.query('CREATE TABLE rooms(id SERIAL PRIMARY KEY, ' +
  'roomName VARCHAR(255) not null, ' +
  'roomId VARCHAR(255) not null, ' +
  'roomPassword VARCHAR(255) not null, ' +
  'timestamp TIMESTAMP not null, ',
  (err, res) => {
    console.log(err, res)
    client.end()
  })

