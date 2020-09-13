var express = require("express");
const mongoose = require("mongoose");
const requiredLogin = require("../middlewares/requiredLogin");
var router = express.Router();
const Subject = require("./../models/Subject");

router.get("/", requiredLogin, async (req, res) => {
    const condition = await req.user.role === 'superadmin' ? {}: {reference: req.user.ucode.toString()};
    Subject.find(condition)
      .limit(10)
      .exec(function (err, sujects) {
        if (err) return handleError(err);
        return res.render("subject/index", { models: sujects, title: "Subject" });
      });
});

router.get("/create",requiredLogin,async (req,res) => {
    return res.render("subject/create", { title: "Create Subject" });
});

router.post("/submit",requiredLogin,async (req,res) => {
    var errors = {};
    const subject = await new Subject({
        name: req.body.name,
        description: req.body.description,
        status: 1,
        reference: req.user.ucode,
    });
    subject.save(async (err, saved) => {
        if (err){
            console.log(err);
            errors.email = "name" in err.name ? err.errors["name"].message : "";
            await req.flash("formError", errors);
        };
        return res.redirect("/subject");
    });
});
module.exports = router;