const { query } = require('express');
const db = require('../services/db');
const colors = require('colors')

const getUsers = async () => {
  try {
    const rows = await db.query('SELECT * FROM User');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

async function checkUser(email, username=''){
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

async function getUser(email, username = null){
  if(username != null) {
    let sql = `SELECT * FROM User WHERE Email = ? or Username = ?`
    let [result] = await db.pool.query(sql, [email, username])
    console.log("Username exists: ".pink, result)
    return result
  }

  let sql = `SELECT * FROM User WHERE Email = ?`
  let [result] = await db.pool.query(sql, [email])
  console.log("Email exists: ".pink, result)
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
  checkUser,
  getName,
  getUser,
  addUser,
};
