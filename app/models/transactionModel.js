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
  
  // rounding to nearest 2 decimal points
  totalBalance = parseFloat(totalBalance).toFixed(2)
  return totalBalance;

};

async function getSingleTransaction(id) {
  let sql = `SELECT * FROM Transaction WHERE TransactionID=?`
  let transaction = await db.pool.query(sql, [id])
  transaction = transaction[0][0]
  return transaction
}

async function updateTransaction(id, newTransaction){
  let sql = `UPDATE Transaction SET `
  let oldTransaction = await getSingleTransaction(id)
  oldTransaction['Date'] = new Date(oldTransaction['Date']).toISOString().slice(0, 10)

  let keys = []
  let values = []

  //console.log(Object.keys(newTransaction))
  //console.log(oldTransaction, newTransaction)

  for(let key of Object.keys(newTransaction)){
    if(oldTransaction[key] != newTransaction[key]){
      //sql += `${key} = "${newTransaction[key]}", `
      keys.push(`${key} = ?`)
      values.push(newTransaction[key])
    }
  }

  if(keys.length == 0)
    return

  sql += keys.join(', ')

  values.push(id)
  sql += ` WHERE TransactionID = ?;`

  //console.log(sql)
  await db.pool.query(sql, values)
}

module.exports = {
  getTransactions,
  calculateTotalBalance,
  getSingleTransaction,
  updateTransaction

};
