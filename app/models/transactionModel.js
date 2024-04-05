const db = require('../services/db');

const createTransaction = async (transactionId, type, amount, date, categoryId, description, userId) => {
  try{
    // Validate input parameters
    if (!type || !amount || !date || !userId){
      throw new Error('Missing required parameters');
    }
    // Insert transaction into the database
     const result = await db.query('INSERT INTO Transaction (Type, Amount, Date, CategoryID, Description, UserID) VALUES (?, ?, ?, ?, ?, ?)', [ type, amount, date, categoryId, description, userId])
     // Return the ID of the newly created transaction
     return result.insertId;
  }catch (error) {
    console.error('Error creating transaction:', error);
    throw error
  }
 }
 

const getTransactions = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM Transaction');
    return rows;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

const calculateTotalBalance = (transactions) => {
  try{
    let totalBalance = 0;
  for (const transaction of transactions) {
    totalBalance += parseFloat(transaction.Amount || 0)    
  }
  return totalBalance;

  }catch (error) {
    console.error('Error calculating total balance:', error);
    throw error
  }

};

const getSingleTransaction = async (id) => {
  try {
    let sql = `SELECT * FROM Transaction WHERE TransactionID=?` 
    const [rows] = await db.pool.query(sql, [id])
    return rows[0] // Return the first transaction found
  } catch (error) {
    console.error('Error fetching single transaction:', error)
    throw error
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  calculateTotalBalance,
  getSingleTransaction,

};
