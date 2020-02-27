const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.tbl_users;
const Pet = models.tbl_pet;
const Spesies = models.tbl_spesies;
const Payment = models.tbl_payment;

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
exports.Register = async (req, res) => {
  try {
    const search = await User.findOne({ where: { email: req.body.email } });
    if (search) {
      res.send({
        Message: "Email is already registered"
      });
    } else {
      const body = req.body;
      const userBody = {
        name: body.breeder,
        email: body.email,
        pass: body.password,
        phone: body.phone,
        address: body.address
      };

      const data = await User.create(userBody);
      if (data) {
        const token = jwt.sign({ userId: data.id }, "darmawan");
        const paymentBody = {
          id_user: data.id,
          status: "Free"
        };
        const petData = {
          id_user: data.id,
          id_sepesies: body.pet.id_spesies,
          age: body.pet.age,
          name: body.pet.name,
          gender: body.pet.gender
        };
        const data2 = await Pet.create(petData);
        if (data2) {
          const data3 = await Pet.findOne({
            where: {
              id: data2.id
            },
            include: [
              {
                model: User
              },
              {
                model: Spesies
              }
            ]
          });
          if (data3) {
            const data4 = await Payment.create(paymentBody);
            res.send({
              id: data3.tbl_user.id,
              name: data3.tbl_user.name,
              email: data3.tbl_user.email,
              phone: data3.tbl_user.phone,
              address: data3.tbl_user.address,
              pet: {
                id: data3.id,
                name: data3.name,
                age: data3.age,
                gender: data3.gender,
                spesies: data3.tbl_spesy.name
              },
              token: token
            });
          } else {
            res.status(400).send({ Message: "Bad request" });
          }
        }
      } else {
        res.send({
          Message: "400"
        });
      }
    }
  } catch (error) {
    res.send({
      message: "Error"
    });
  }
};
