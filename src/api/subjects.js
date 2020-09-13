var express = require("express");
var router = express.Router();
const Subject = require("./../models/Subject");
const authentication = require("./../middlewares/authentication");
router.get("/", authentication, async (req, res) => {
  Subject.find({ status: 1 }, "name", function (err, subjects) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(subjects);
    }
  });
});
module.exports = router;
