var jwt = require("jsonwebtoken");
const User = require("./../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, decode) => {
      if (err) {
        res.status(401).json({ error: "fail to authenticate" });
      } else {
        User.findById(decode.id ,"name email phone ucode", function (err, user) {
          if (err) {
            res.status(400).json(err);
          } else {
            req.currentUser = user;
            next();
          }
        });        
      }
    });
  } else {
    res.status(401).json({ error: "unauthorized access" });
  }
};
