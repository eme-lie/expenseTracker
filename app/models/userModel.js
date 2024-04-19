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

async function getUser(email, username = null){
  if(username != null) {
    let sql = `SELECT * FROM User WHERE Email = ? or Username = ?`
    let [result] = await db.pool.query(sql, [email, username])
    return result
  }

  let sql = `SELECT * FROM User WHERE Email = ?`
  let [result] = await db.pool.query(sql, [email])
  return result

}

async function addUser(data){
  let sql = `INSERT INTO User(FirstName, LastName, DateOfBirth, Username, Email, Password) VALUES(?)`
  let user = []

  for([keys, values] of Object.entries(data))
    user.push(values)
  
  await db.pool.query(sql, [user])
}

module.exports = {
  getUsers,
  getName,
  getUser,
  addUser,
};
