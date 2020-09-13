// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Bcrypt = require("bcryptjs");
const User = require("./../models/User");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    //passport.serializeUser() is setting id as cookie in user’s browser
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    //passport.deserializeUser() is getting id from the cookie, which is then used in callback to get user info
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "This email is not registered!",
            });
          }
          Bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
              return done(null, false, {
                message: "This password is invalid!",
              });
            }
            return done(null, user);
          });
          
        })
        .catch((err) => console.log(err));
    })
  );
};
