var express = require("express");
const requiredLogin = require("../middlewares/requiredLogin");
var router = express.Router();
router.get("/",requiredLogin, async (req, res) => {
  res.render("site/index",{ title: 'Dashboard'});
});
module.exports = router;
