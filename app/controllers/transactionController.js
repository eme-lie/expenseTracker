const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');
const categoryModel = require('../models/categoryModel')



// Reading transactions
router.get('/', async (req, res, next) => {
  try {
    const transactions = await transactionModel.getTransactions();
    res.render('transactions', { title: 'Transaction List', transactions });

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
  //console.log(req.body)
  let passingData = {
    ...req.body,
    UserID: Math.round(Math.random()*4),
  }

  console.log(passingData)
  res.redirect('/transactions')
})

// Updating transactions
router.get('/:id/update', async(req, res, next) => {
  transaction = await transactionModel.getSingleTransaction(req.params.id)
  
  const categories = await categoryModel.getCategories()
  res.render('transaction_Form', {
    title: `Update Transaction: ${transaction.Description}`,
    categories,
    transaction,

  })
})

router.post('/:id/update', async(req, res, next) => {
  transaction = await transactionModel.getSingleTransaction(req.params.id)
  console.log(req.body)
  res.redirect('/transactions')
})

// DELETING FROM A MODAL
router.post('/', async(req, res, next) => {
  console.log('use this id to delete in a query: ' + req.body['transaction_id'])
  res.redirect('/transactions')
})

module.exports = router;
