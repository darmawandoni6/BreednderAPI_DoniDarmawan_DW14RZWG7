const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.tbl_users;
const Pet = models.tbl_pet;

exports.login = (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

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

//taks 2
exports.Register = (req, res) => {
  const body = req.body;
  const userBody = {
    name: body.breeder,
    email: body.email,
    pass: body.password,
    phone: body.phone,
    address: body.address
  };
  User.create(userBody).then(data => {
    // res.send(data);
    if (data) {
      const token = jwt.sign({ userId: data.id }, "darmawan");
      const petData = {
        name: body.pet.name,
        gender: body.pet.gender,
        id_user: data.id,
        id_sepesies: body.pet.spesies.id,
        age: body.pet.age
      };
      Pet.create(petData).then(pet => {
        if (pet) {
          res.send({
            email: data.email,
            token: token
          });
        }
      });
    }
  });
};
