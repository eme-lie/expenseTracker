const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../services/db');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid')

exports.signup = async (req, res, next) => {
  try{
    // Generate salt
    const salt = await bcrypt.genSalt(12)

    // Hash password with the generated salt
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt)
    
    // Create user
    const UserID = uuidv4();
    await User.createUser(UserID, req.body.Email, hashedPassword, req.body.Username, req.body.FirstName)
    
    // Create token
    // const token = jwt.sign({UserID}, secretKey, {expiresIn: '2h'})

    // redirect to home page if successful  
    res.redirect('/home')

  }catch(error){
    console.error('Error creating user', error);
    res.status(500).json({ error: 'Server Error'})
  }
}


exports.login = async (req, res, next) => {
  try {
    // Validation error handling
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() })
    }
   
    
    // Fetch user by email and password
    const user = await User.getUserByEmailAndPassword(req.body.Email, req.body.Password);

    // Check if the user is null or undefined
    if(!user || user === undefined){
      return res.status(401).json({ errors: 'Invalid Credentials'});
    }

    // Check if the password is provided
    if(!req.body.Password){
      return res.status(401).json({ errors: 'Password is required'})
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(req.body.Password, user.hashedPassword);
    if(!isPasswordValid){
      return res.status(401).json({ error: 'Invalid Credentials'})
    } 

    // Generate access token
    const accessToken = jwt.sign({ userId: user.UserID}, secretKey, { expiresIn: '2h'})
    

    // Respond with token
    res.redirect('/home')
    // res.status(200).json({ accessToken})
    
  } catch(error){
      console.error('Login error', error)
      res.status(500).json({ error: 'Server Error'})
  }

}

