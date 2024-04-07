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
  try {
    let sql = `SELECT * FROM User WHERE email = ?`
    let [result] = await db.pool.query(sql, [email])
    result = result[0]
    return result
  } catch(err){
    console.error(err);
    throw err
  }

}

async function getName(id){
  try {
    let sql = `SELECT CONCAT(FirstName," ", LastName) AS "Name" FROM User WHERE UserID = ?`
    let [result] = await db.pool.query(sql, id)
    result = result[0].Name
    return result
  } catch(err){
    console.error(err)
    throw err
  }
  
}

module.exports = {
  getUsers,
  checkUser,
  getName,
};
