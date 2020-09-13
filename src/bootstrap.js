var dashboard = require("./routes/dashboard");
var user = require("./routes/user");
var auth = require("./routes/auth");
var site = require("./routes/site");
var client = require("./routes/client");
var subject = require("./routes/subject");
var question = require("./routes/question");
var apiAuth = require("./api/auth");
var apiSubjects = require("./api/subjects");
var apiSubjectTest = require("./api/subjectTest");
module.exports = (app) => {
  app.use("/", site);
  app.use("/dashboard", dashboard);
  app.use("/users", user);
  app.use("/auth", auth);
  app.use("/client", client);
  app.use("/subject", subject);
  app.use("/question", question);
  app.use("/api/auth",apiAuth);
  app.use("/api/subject",apiSubjects);
  app.use("/api/subject-test",apiSubjectTest);
};