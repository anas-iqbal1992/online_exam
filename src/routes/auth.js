var express = require("express");
const passport = require("passport");
var router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
router.post("/", checkLogin, async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
