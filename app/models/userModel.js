const db = require('../services/db');

class User {
  static async getUserByEmailAndPassword(email, password) {
    const [rows] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
    if(rows.length === 0){
      return null // User not found
    }
    return rows.map(({ Email, Password}) => ({ Email, hashedPassword: Password}))[0]
  }

  static async createUser(userId, email, password, username, firstName) {
    try{
    const result = await db.query('INSERT INTO User (Email, Password, Username, FirstName) VALUES (?, ?, ?, ?, ?)', [userId, email, password, username, firstName])
    // Check if the result is an array with atleast one element
    if(Array.isArray(result) && result.length > 0){
      const insertId = result[0].insertId

      // Check if insertId is valid
      if(insertId !== undefined){
      }
    }  
    // If the result doesn't match the expected format, throw an error
    throw new Error('User creation failed: Invalid result format')
    }catch(error){
       console.error('Error creating user:', error);
       throw error; // Rethrow the error to handle it in the signup controller
    }
  }
}

module.exports = User

