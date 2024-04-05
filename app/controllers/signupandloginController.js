const express = require("express");
// const signupandloginModel = require("../models/signupandloginModel");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signupandlogin", { current_view: "signup" });
  //   signupandloginModel.signUpView();
});

router.get("/login", (req, res) => {
  //   signupandloginModel.loginView();
  res.render("signupandlogin", { current_view: "login" });
});

module.exports = router;
