var express = require("express");
var router = express.Router();
const Question = require("./../models/Question");
const authentication = require("./../middlewares/authentication");
router.get("/", authentication, async (req, res) => {
  Question.find({ subject_id: req.query.id })
    .populate({ path: "subject_id", select: ["name", "description"] })
    .then(async (questions) => {
      let subject = [];
      let quest = [];
      let newAarry = {};
      if (questions) {
        questions.forEach((element) => {
          subject = element.subject_id;
          quest.push({
            answers: element.answers,
            quesId: element._id,
            question: element.question,
            description: element.description,
          });
        });
        newAarry= {subject, quest};
      }
      res.status(200).json(newAarry);
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
});
module.exports = router;
