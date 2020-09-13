var express = require("express");
var router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("./../models/User");
var jwt = require("jsonwebtoken");
router.post("/log-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ email: { message: "Wrong UserName" } });
    }
    Bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        res.status(400).json({ password: { message: "Wrong Password" } });
      }
      const token = await jwt.sign(
        {
          id: user.id,
          username: user.name,
          email: user.email,
          phone: user.phone_no,
        },
        process.env.JWTSECRET
      );
      res.status(200).json({ token });
    });
  } catch (err) {
    let verrors = {};
    if (!Array.isArray(err.errors)) {
      console.log(err);
      res.status(500).json(err.errors);
    } else {
      err.errors.forEach((e) => (verrors[e.path] = e.message));
      res.status(500).json(verrors);
    }
  }
});
module.exports = router;
