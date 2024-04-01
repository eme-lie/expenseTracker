require("dotenv").config();

const mysql = require('mysql2/promise');

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: process.env.DB_CONTAINER,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
  secretKey: process.env.SECRET_KEY
};

  
const pool = mysql.createPool(config.db);

// Utility function to query the database
async function query(sql, params = []) {
  // Filter out undefined parameters
  const filteredParams = params ? params.filter(param => param !== undefined) : [];

  // Execute the query with filtered parameters
  const data = await pool.execute(sql, filteredParams);

  return data;
}

module.exports = {
  query,
  secretKey: config.secretKey,
  pool,
}