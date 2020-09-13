const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requiredLogin = require("../middlewares/requiredLogin");
const User = require("../models/User");
const Client = require("./../models/Client");
const util = require("../helper/util");
const emailTemplate = require("../services/emailTemplates/userPasswordTemplate");
const Mailer = require("../services/Mailler");

router.get("/", requiredLogin, async (req, res) => {
  const condition = await req.user.role === 'superadmin' ? {}: {reference: req.user.ucode.toString()};
  Client.find(condition)
    .limit(10)
    .exec(function (err, client) {
      if (err) return handleError(err);
      res.render("client/index", { models: client, title: "Client" });
    });
});
router.get("/create", requiredLogin, (req, res) => {
  res.render("client/create", { title: "Create User" });
});
router.post("/create-client", requiredLogin, async (req, res) => {
  const saveStudent = async (savedUser) => {
    var errors = {};
    const client = await new Client({
      name: req.body.name,
      board: req.body.board,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      user: savedUser._id,
      email: req.body.email,
      addresses: {
        address1: req.body.address1,
        address2: req.body.address2,
      },
      reference: req.user.ucode,
    });
    client.save(async (err, client) => {
      if (err) {
        console.log(err.errors);
        errors.email = "email" in err.errors ? err.errors["email"].message : "";
        await req.flash("formError", errors);
        return res.redirect("/client/create");
      }
      return res.redirect("/client");
    });
  };
  const session = await mongoose.startSession();
  // session.startTransaction();
  const randamPass = "12345678";
  const dynPass = await util.hashPassword(randamPass);
  try {
    var errors = {};
    const user = await new User({
      ucode: util.uniqueCode(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: dynPass,
      status: 1,
      role: "client",
      reference: req.user.ucode,
    });
    user.save(async (err, savedUser) => {
      if (err) {
        errors.email = "email" in err.errors ? err.errors["email"].message : "";
        errors.phone = "phone" in err.errors ? err.errors["phone"].message : "";
        await req.flash("formError", errors);
        return res.redirect("/client/create");
      }
      await saveStudent(savedUser);
      // await session.commitTransaction();
      // await Mailer(savedUser, emailTemplate(savedUser, randamPass));
      
    });
    // res.redirect("/");
  } catch (error) {
    // await session.abortTransaction();
  } finally {
    session.endSession();
  }
});
module.exports = router;
