const express = require("express");
// const signupandloginModel = require("../models/signupandloginModel");
const userModel = require("../models/userModel")
const cookieParser = require('cookie-parser')
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signupandlogin", { 
    current_view: "signup", 
    title: "Sign Up"
  });
  //   signupandloginModel.signUpView();
});

router.get("/login", (req, res) => {
  //   signupandloginModel.loginView();
  res.render("signupandlogin", { 
    current_view: "login",
    title: "Log In" 
  });
});

router.post("/login", async (req, res) => {
  let result = await userModel.checkUser(req.body.email)
  if(result){
    res.cookie('user', result.UserID)
    res.redirect('/home')
  }
  else{
    res.redirect('/auth/login')
  }

})

router.get("/logout", async (req, res) => {
  res.render('log_out', { title: "Log Out"})
})

router.post("/logout", async (req, res) => {
  res.cookie('user', 'admin')
  res.redirect('/')
})



module.exports = router;
