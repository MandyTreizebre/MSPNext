import mysql from "mysql2"
import { Pool } from 'pg'

const pool = process.env.POSTGRES_URL
  ? new Pool({
    connectionString: process.env.POSTGRES_URL,
  })
  : mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise()

  const replaceQuestionMarks = (input) => {
    let index = 0;
    return input.replace(/\?/g, () => `$${++index}`);
  }

export function query(sql, params) {

  if (process.env.POSTGRES_URL) {
    return pool.query(replaceQuestionMarks(sql), params).then(res => {
      return res.rows
    })
  } else {
    return pool.query(sql, params).then(res => {
      return res[0]
    })
  }
}

