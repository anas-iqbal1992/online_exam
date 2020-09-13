var express = require("express");
var router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("./../models/User");
const checkLogin = require("../middlewares/checkLogin");
const requiredLogin = require("../middlewares/requiredLogin");
router.get("/login", checkLogin, (req, res) => {
  res.render("site/login",{ layout: 'layouts/loginLayouts' });
});
router.post("/logout",requiredLogin , (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
