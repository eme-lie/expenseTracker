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
  // checking if the user exists
  let check = await userModel.getUser(req.body.Email, req.body.Username)
  if(check.length >= 1){
    res.render("signupandlogin", { 
      current_view: "signup", 
      title: "Sign Up",
      errors: `User Already Exists`
    });

    return
  }


  let data = {
    ...req.body
  }

  // hashing password
  const salt = bcrypt.genSaltSync(13)
  const hash = await bcrypt.hash(data.Password, salt)
  data.Password = hash

  
  let result = await userModel.addUser(data)
  console.log(result)
  //result = result[0].UserID
  
  let UserID = await userModel.getUser(data.Email)
  UserID = UserID[0].UserID
  res.cookie('user', UserID)
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
  
    if(result){
      let truePassword = result.Password
      let formPassword = req.body.password
      const isMatch = await bcrypt.compare(formPassword, truePassword)
      
      if(isMatch){
        // user is logged in
        if(result.UserID == 0)
          res.cookie('user', "admin")
        else
          res.cookie('user', result.UserID)
        
        res.redirect('/home')
      }
      else {
        // wrong passwod
        res.render("signupandlogin", { 
          current_view: "login",
          title: "Log In",
          errors: `Wrong Password`
        });
      }
    } else {
      // no user
      res.render("signupandlogin", { 
        current_view: "login",
        title: "Log In",
        errors: `No Such User: ${req.body.email}`
      });
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
