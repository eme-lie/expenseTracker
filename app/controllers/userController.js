const express = require('express');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await userModel.getUsers();
    res.render('users', { title: 'User List', users });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
