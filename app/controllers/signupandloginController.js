const express = require("express");
// const signupandloginModel = require("../models/signupandloginModel");
const userModel = require("../models/userModel")
const cookieParser = require('cookie-parser')
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signupandlogin", { current_view: "signup" });
  //   signupandloginModel.signUpView();
});

router.get("/login", (req, res) => {
  //   signupandloginModel.loginView();
  res.render("signupandlogin", { current_view: "login" });
});

router.post("/login", async (req, res) => {
  let result = await userModel.checkUser(req.body.email)
  if(result){
    res.cookie('user', result.UserID)
    res.redirect('/home')
  }
  else{
    res.redirect('/')
  }

})

router.get("/logout", async (req, res) => {
  res.render('log_out')
})

router.post("/logout", async (req, res) => {
  res.cookie('user', 'admin')
  res.redirect('/')
})



module.exports = router;
