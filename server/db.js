require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({ connectionString });

async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}

module.exports = { pool, query };