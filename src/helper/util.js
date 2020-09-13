var bcrypt = require('bcryptjs');
module.exports =  {
  uniqueCode: () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  },
  hashPassword: (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  genrateRandamPassword:() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
};
