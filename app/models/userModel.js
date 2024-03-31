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
    const result = await db.query('INSERT INTO User (Email, Password, Username, FirstName) VALUES (?, ?, ?, ?)', [email, password, username, firstName])
    // Check if the affected rows is greater than 0, indicating successful insertion
    if(result[0].affectedRows > 0){
      return { success: true }
    }else{
      throw new Error('User Creation Failed: No rows affected')
    }  
  
    }catch(error){
       console.error('Error creating user:', error);
       throw error; // Rethrow the error to handle it in the signup controller
    }
  }
}

module.exports = User

