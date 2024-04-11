const express = require("express");
const signupandloginModel = require("../models/signupandloginModel");
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const router = express.Router();

// Sign Up
router.get("/signup", function(req, res){
  res.render("signupandlogin", { 
    current_view: "signup", 
    title: "Sign Up"
  });
});

router.post("/signup", async function(req, res){
  let data = {
    ...req.body
  }
  const salt = bcrypt.genSaltSync(13)
  const hash = await bcrypt.hash(data.Password, salt)
  data.Password = hash

  console.log(data)
  let result = await userModel.addUser(data)

  if(result == "USER EXISTS")
    res.redirect('/auth/signup')
  
  
  res.redirect('/home')
})

// Login
router.get("/login", function(req, res){
  res.render("signupandlogin", { 
    current_view: "login",
    title: "Log In" 
  });
});

router.post("/login", async function (req, res){
  try{
    let result = await userModel.checkUser(req.body.email)  
  
    //if(result && isMatch){
    if(result){
      let truePassword = result.Password
      let formPassword = req.body.password
      const isMatch = await bcrypt.compare(formPassword, truePassword)
      
      if(isMatch){
        res.cookie('user', result.UserID)
        res.redirect('/home')
      }
      else {
        res.redirect('/auth/login')
      }
    } else {
      res.redirect('/auth/login')
    }
  } catch(err){
    console.error(err)
    throw err
  }
})

// Log out
router.get("/logout", async function(req, res) {
  res.render('log_out', { title: "Log Out"})
})

router.post("/logout", async function(req, res){
  res.cookie('user', 'admin')
  res.redirect('/')
})

module.exports = router;
