const db = require('../services/db');
const { pool } = require('../services/db')



const getTransactions = async (UserID='admin') => {
  try {
    let sql = `SELECT * FROM Transaction`

    if(UserID != 'admin'){
      sql += ` WHERE UserID=?`
      const [rows] = await db.pool.query(sql, [UserID])
      return rows
    } else{
      return await db.query(sql);
    }

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

// Create transaction
const createTransaction = async (type, amount, date, categoryId, description, userId) => {
  try{
    const result = await db.query(
      'INSERT INTO Transaction (Type, Amount, Date, CategoryID, Description, UserID) VALUES (?, ?, ?, ?, ?, ?)', 
      [type, amount, date, categoryId, description, userId])
    return result.insertId
  }catch (error){
    console.error('Error creating transaction:', error)
    throw error;
  }

}


async function deleteTransaction(id) {
  let sql =`DELETE FROM Transaction WHERE TransactionID = ?`
  await db.pool.query(sql, [id])
};

async function getSingleTransaction(id) {
  let sql = `SELECT * FROM Transaction WHERE TransactionID=?`
  let transaction = await db.pool.query(sql, [id])
  transaction = transaction[0][0]
  return transaction
};


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

async function getTransactionsbyCategory(id){
  let sql = `SELECT * FROM Transaction WHERE CategoryID=?`
  let [transaction] = await db.pool.query(sql, [id])
  //transaction = transaction
  return transaction
}

async function superTable(user=null){

  let sql = "SELECT T.TransactionID, T.Type, T.Amount, T.Date, T.Description, C.CategoryName, U.Email FROM Transaction T, Category C, User U WHERE T.CategoryID = C.CategoryID AND T.UserID = U.UserID"

  if(user !== "admin"){
    //sql += `AND T.UserID = ? `
    sql = "SELECT T.TransactionID, T.Type, T.Amount, T.Date, T.Description, C.CategoryName, U.Email FROM Transaction T, Category C, User U WHERE T.CategoryID = C.CategoryID AND T.UserID = U.UserID AND T.UserID = ?"

    let [results] = await pool.query(sql, [Number(user)])
    //console.log(results)
    return results
  } 
  
  let [results] = await pool.query(sql)
  //console.log(results)
  return results

}

module.exports = {
  getTransactions,
  calculateTotalBalance,
  getSingleTransaction,
  getTransactionsbyCategory,
  deleteTransaction,
  updateTransaction,
  createTransaction,
  superTable,
};
