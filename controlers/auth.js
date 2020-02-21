const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.tbl_user;

exports.login = (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  console.log(email);

  User.findOne({ where: { email, pass } }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, "darmawan");
      res.send({
        email: user.email,
        token: token
      });
    } else {
      res.send({
        error: true,
        message: "wrong username and password"
      });
    }
  });
};
