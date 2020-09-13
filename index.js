const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
require("./src/services/passport")(passport);
require("dotenv").config();
mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var path = require("path");
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  session({
    secret: process.env.COOKEYSECRET,
    name:'_loginSession',
    cookie:{maxAge:864000},
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next) => {
    res.locals.messages = req.flash('messages') || null;
    res.locals.error = req.flash('error') || null;
    res.locals.formError = req.flash('formError') || null;
    res.locals.user = req.user || null;
    // delete req.session.message
    next()
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./src/bootstrap")(app);

app.listen(5000, () => console.log("server running on 5000 port"));
