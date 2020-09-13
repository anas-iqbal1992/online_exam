var express = require("express");
const requiredLogin = require("../middlewares/requiredLogin");
var router = express.Router();
const Subject = require("./../models/Subject");
const Question = require("./../models/Question");
router.get("/",requiredLogin, async (req, res) => {
   Question.find({status:1})
        .populate('subject_id', "-_id + name")
        .select('-answers')
        .limit(10)
        .exec(function (err, questions) {
          console.log("questions =>",questions);
          if (err) return handleError(err);
              return res.render("question/index", { title: "Question", models:questions });
        });
});
router.get("/add-more", async (req, res) => {
  res.render("question/_new-ans", {
    layout: false,
    no: req.query.no,
  });
});
router.get("/create", requiredLogin, async (req, res) => {
  let sub = [];
  for await (const doc of Subject.find({ status: 1 })) {
    sub[doc._id] = await doc.name;
  }
  return res.render("question/create", {
    title: "Create Question",
    subjects: sub,
  });
});
router.post("/submit", requiredLogin, async (req, res) => {
  const answ = await answerObj(req.body.answer);
  const question = await new Question({
    subject_id: req.body.subject,
    question: req.body.question,
    description: req.body.description,
    answers: answ,
    status: 1,
    reference: req.user.ucode,
  });
  await question.save(async (err, saveQues) => {
    if (err) {
      console.log(err);
    }
    return res.redirect("/question");
  });
});

const answerObj = async (ans) => {
  let new_arry = {};
  for (let i = 1; i <= ans.length; i++) {
    new_arry[i] = await ans[i - 1];
  }
  return new_arry;
};
module.exports = router;
