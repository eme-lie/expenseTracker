const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');
const categoryModel = require('../models/categoryModel')

const { transaction } = require("../models/transactionModel")

// Reading transactions
router.get('/', async (req, res, next) => {
  try {
    //const transactions = await transactionModel.getTransactions(req.cookies.user);

    
    //const transactions = await transactionModel.superTable(req.cookies.user)
    const transactions = await transaction.superTable(req.cookies.user)

    res.render('transactions', { 
      title: 'Transaction List', 
      transactions 
    });

  } catch (err) {
    next(err);
  }
});


// Creating transactions
router.get('/create', async (req, res, next) => {
  const categories = await categoryModel.getCategories()
  //console.log(categories)
  res.render('transaction_Form', {
    title: "Add a Transaction",
    categories,
    transaction: undefined,
  })
})

router.post('/create', async(req, res, next) => {
  try{
    /*
    let passingData = {
      ...req.body,
      UserID: req.cookies.user == 'admin' ? 0 : req.cookies.user,
    }
    */


    //let { Type, Amount, Date, CategoryID, Description, UserID } = passingData
    let { Type, Amount, Date, CategoryID, Description } = req.body
    const UserID = req.cookies.user == 'admin' ? 0 : req.cookies.user

    if((Type == 'expense') && (Number(Amount) > 0))
      Amount = "-" + Amount

    if((Type == 'income') && (Number(Amount) < 0))
      Amount = Number(Amount) * -1

    //await transactionModel.createTransaction(Type, Amount, Date, CategoryID, Description, UserID);
    transaction.createTransaction(Type, Amount, Date, CategoryID, Description, UserID)
    
    res.redirect('/transactions')
  
  }catch (err) {
   next(err)
  }
 
})

// Deleting transactions
router.post('/', async(req, res, next) => {
  const delete_id = req.body['transaction_id']
  
  //transactionModel.deleteTransaction(delete_id)
  transaction.deleteTransaction(delete_id)
  res.redirect('/transactions')
 })

// Updating transactions
router.get('/:id/update', async(req, res, next) => {
  //const transaction_ = await transactionModel.getSingleTransaction(req.params.id)
  const transaction_ = await transaction.getSingleTransaction(req.params.id)
  
  const categories = await categoryModel.getCategories()
  res.render('transaction_Form', {
    title: `Update Transaction: ${transaction_.Description}`,
    categories,
    transaction:transaction_,
  })
})

router.post('/:id/update', async(req, res, next) => {
  let newTransaction = {
    ...req.body
  }

  newTransaction['Date'] = new Date(newTransaction['Date']).toISOString().slice(0, 10)

  if((newTransaction['Type'] == 'expense') && (Number(newTransaction['Amount']) > 0))
    newTransaction['Amount'] = "-" + newTransaction['Amount']

  if((newTransaction['Type'] == 'income') && (Number(newTransaction['Amount']) < 0))
    newTransaction['Amount'] = Number(newTransaction['Amount']) * -1

  //await transactionModel.updateTransaction(req.params.id, newTransaction)
  await transaction.updateTransaction(req.params.id, newTransaction)

  res.redirect('/transactions');
})

module.exports = router;
