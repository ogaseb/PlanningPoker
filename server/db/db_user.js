require('dotenv').config()
import { Client } from 'pg/lib'

export async function createUser (userId, userName, userEmail) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  try {
    await client.query(
      `INSERT INTO users(user_id,user_name,user_email) VALUES('${userId}', '${userName}', '${userEmail}')`
    )
    console.log('DB -> save user in DB')
    await client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function editUserJira (
  jiraLogin,
  jiraPassword,
  jiraSubdomain,
  userId
) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  try {
    await client.query(
      `UPDATE users SET jira_email = '${jiraLogin}', jira_api_key = '${jiraPassword}', jira_subdomain = '${[
        jiraSubdomain
      ]}'  WHERE user_id = '${userId}'`
    )
    console.log('DB -> save jira credentials in DB')
    await client.end()
  } catch (e) {
    console.log(e)
  }
}

export async function findUser (userId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()
  try {
    const res = await client.query(
      `SELECT * FROM users WHERE user_id = '${userId}'`
    )
    console.log('DB -> user found in DB')
    await client.end()
    return res
  } catch (e) {
    console.log(e)
  }
}
