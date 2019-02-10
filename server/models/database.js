require("dotenv").config()
const {Client} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})
client.connect()

client.query('CREATE TABLE IF NOT EXISTS rooms(id SERIAL PRIMARY KEY, ' +
  'room_name "char" not null, ' +
  'room_id "char" not null, ' +
  'room_password "char" not null, ' +
  'room_tags json[], ' +
  'room_history json, ' +
  'room_board_id json, ' +
  'user_id "char" not null, ' +
  'room_timestamp TIMESTAMP not null, ',
  (err, res) => {
    console.log(err, res)
    client.end()
  })

client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, ' +
  'user_id "char" not null, ' +
  'user_name "char" not null, ' +
  'user_email "char" not null, ' +
  'jira_subdomain "char" not null, ' +
  'jira_email "char" not null, ' +
  'user_name "char" not null, ',
  (err, res) => {
    console.log(err, res)
    client.end()
  })


client.query(
  `INSERT INTO users(user_id,user_name,user_email) 
    SELECT 'guest', 'guest', 'guest'
    WHERE NOT EXISTS (
        SELECT 1 FROM keys WHERE user_id='guest'
    )`,
  (err, res) => {
    console.log(err, res)
    client.end()
  })
