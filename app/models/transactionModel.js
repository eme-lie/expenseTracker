const db = require('../services/db');

const getTransactions = async () => {
  try {
    const rows = await db.query('SELECT * FROM Transaction');
    return rows;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

const calculateTotalBalance = (transactions) => {
  let totalBalance = 0;
  for (const transaction of transactions) {
    totalBalance += parseFloat(transaction.Amount)    
  }
  return totalBalance;

};

async function getSingleTransaction(id) {
  let sql = `SELECT * FROM Transaction WHERE TransactionID=?`
  let transaction = await db.pool.query(sql, [id])
  transaction = transaction[0][0]
  return transaction
}

async function deleteTransaction(id) {
  try {
    const sql = 'DELETE FROM Transaction WHERE TransactionID = ?';
    const result = await db.query(sql, [id]);
    if (result.affectedRows === 0) {
      throw new Error('Transaction not found');
    }
    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

module.exports = {
  getTransactions,
  calculateTotalBalance,
  getSingleTransaction,
  deleteTransaction,
};
