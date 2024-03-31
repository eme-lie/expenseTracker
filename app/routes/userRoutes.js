const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const { signup, login } = require('../controllers/userController')
const User = require('../models/userModel');



// Render the signup form
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle signup form submission  
router.post('/signup', [
   body('Email').isEmail().withMessage('Please enter a valid email').custom(async (value) => {
     const foundUser = await User.getUserByEmail(value);
     if(foundUser){
        return Promise.reject('User already exist')
     }
   }), 
   body('Password').notEmpty().withMessage("Password field can't be empty"),
   body('Username')
      .notEmpty().withMessage("Username field can't be empty")
      .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long')
  ], 
  signup
);

// Render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/login', [
  body('Email').isEmail().withMessage('Please enter a valid email'),
  body('Password').notEmpty().withMessage("Password field can't be empty")
], login)

module.exports = router;