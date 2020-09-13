var express = require("express");
var back = require("express-back");
const mongoose = require("mongoose");
const requiredLogin = require("../middlewares/requiredLogin");
var router = express.Router();
const User = require("./../models/User");
const util = require("../helper/util");
const Mailer = require("../services/Mailler");
const emailTemplate = require("../services/emailTemplates/userPasswordTemplate");
const { exists } = require("./../models/User");
router.get("/", requiredLogin, async (req, res) => {
  const condition = await req.user.role === 'superadmin' ? {}: {reference: req.user.ucode.toString()};
  User.find(condition)
    .limit(10)
    .exec(function (err, users) {
      if (err) return handleError(err);
      res.render("users/index", { users: users, title: "Users" });
    });
  // res.render("users/index");
});
router.get("/create", requiredLogin, (req, res) => {
  res.render("users/create", { title: "Create User" });
});
router.post("/record", requiredLogin, async (req, res,next) => {
  const session = await mongoose.startSession();
  // const randamPass = await util.genrateRandamPassword();
  const randamPass = "12345678";
  const dynPass = await util.hashPassword(randamPass);
  session.startTransaction();
  var errors = {};
  try {
    const user = await new User({
      ucode: util.uniqueCode(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: dynPass,
      status: 1,
      role: req.body.role,
      reference: req.user.ucode,
    });
    await user.save(async (err, savedUser) => {
      if (err){
        errors.email =  "email" in err.errors ? err.errors['email'].message : '';
        errors.phone =  "phone" in err.errors ? err.errors['phone'].message : '';
        await req.flash('formError', errors);
        return res.redirect('/users/create');
      }
      session.commitTransaction();
      await Mailer(savedUser, emailTemplate(savedUser, randamPass));
      return res.redirect("/users");
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
  } finally {
    session.endSession();
  }
});
module.exports = router;
