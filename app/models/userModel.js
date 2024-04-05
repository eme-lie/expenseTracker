const { query } = require('express');
const db = require('../services/db');

const getUsers = async () => {
  try {
    const rows = await db.query('SELECT * FROM User');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

async function checkUser(email){
  let sql = `SELECT * FROM User WHERE email = ?`
  let [result] = await db.pool.query(sql, [email])
  result = result[0]
  console.log(result)

  return result
}

module.exports = {
  getUsers,
  checkUser
};
