const express = require('express');
const router = express.Router();
const createTransaction = require('../models/transactionModel').createTransaction;
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


// Displaying form for creating a transactions
router.get('/create', async (req, res, next) => {
  const categories = await categoryModel.getCategories();
  try{
    res.render('transaction_Form', {
      title: "Add a Transaction",
      categories,
      transaction: undefined,
    })

  }catch(err){
    next(err)
  }
})

// Process creation of a transaction
router.post('/create', async(req, res, next) => {
  
  try{
    console.log('req.body', req.body);
    const { Type, Amount, Date, CategoryID, Description } = req.body;
    // Extract UserID from query parameters
    const { UserID } = req.query;
    const transactionId = await createTransaction(null, Type, Amount, Date, CategoryID, Description, UserID);
    res.status(201).json({ newTransactionId: transactionId})
    res.redirect('/transactions')
  }catch(err){
    next(err)
  }
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
