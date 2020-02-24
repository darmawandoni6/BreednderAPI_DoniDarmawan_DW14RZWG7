const { authenticated } = require("../midleware");

const Age = require("../models").tbl_age;
const Species = require("../models").tbl_spesies;

const Match = require("../models").match;
const Premium = require("../models").tbl_payment;

// var token = 'eyJ0eXAiO.../// jwt token';

// var decoded = jwt_decode(token);
// console.log(decoded);
//  var decodedHeader = jwt_decode(token, { header: true });
//  console.log(decodedHeader)

let veryfyJwt = jwTVertifikasi => {
  console.log(jwTVertifikasi);
  let jwtData;
  let auth = jwTVertifikasi.split(" ")[1],
    decoded;

  try {
    decoded = jwt.verify(auth, authenticated);
    console.log(decoded);
    jwtData = { error: false, values: decoded };
  } catch (e) {
    jwtData = {
      error: true,
      values: null
    };
  }

  return jwtData;
};

// taks 3.1

//taks 3.2
exports.spesiesAll = (req, res) => {
  species.findAll().then(data => {
    res.send({ data });
  });
};
//task 4.1

//task 4.2
exports.petAllJoin = (req, res) => {
  pet
    .findAll({
      attributes: [
        "id",
        "name",
        "gender",
        "about_pet",
        "photo",
        "about_pet",
        "createdAt",
        "updatedAt"
      ],
      include: [
        {
          model: species,
          attributes: ["id", "name"]
        },
        {
          model: user,
          attributes: ["id", "name", "address", "phone"]
        },
        {
          model: age,
          attributes: ["name"]
        }
      ]
    })
    .then(data => {
      res.send({
        data
      });
    });
};
//task 4.3
exports.updatePet = (req, res) => {
  const { name, gender, spesies, age, user, about_pet, photo } = req.body;
  const updatePet = {
    id_email: user.id,
    id_sepesies: spesies.id,
    id_age: age.id,
    name,
    gender,
    photo,
    about_pet
  };
  pet.update(updatePet, { where: { id: req.params.id } }).then(data => {
    // res.send(req.params.id);
    if (data) {
      pet
        .findOne({
          include: [
            // {
            //   model: tbl_spesies,
            //   attributes: ["id", "name"]
            // },
            // {
            //   model: tbl_user,
            //   attributes: ["id", "name", "address", "phone"]
            // },
            {
              model: tbl_age,
              attributes: ["id", "name"]
            }
          ],
          where: { id: req.params.id }
        })
        .then(data2 => {
          res.send({
            data2
          });
        });
    }
  });
};
//Taks 4.4
exports.deletePet = (req, res) => {
  pet.destroy({ where: { id: req.params.id } }).then(user => {
    res.send({
      id: req.params.id
    });
  });
};
//task 5

//task 6.1
exports.user = (req, res) => {
  // const jwtData = veryfyJwt(req.headers.authorization);
  // console.log(jwtData.error);
  // console.log(req.params.id);
  // if (!jwtData.error) {
  // const idJwt = jwtData.values.req.params.id;
  // user.findOne({ where: { id: idJwt } }).then(data => {
  user.findOne({ where: { id: req.params.id } }).then(data => {
    res.send({
      name: data.name,
      address: data.address,
      phone: data.phone,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  });
  // }
};
//task 6.2
exports.updateUser = (req, res) => {
  user.update(req.body, { where: { id: req.params.id } }).then(data => {
    if (data) {
      user.findOne({ where: { id: req.params.id } }).then(data2 => {
        res.send({
          name: data2.name,
          address: data2.address,
          phone: data2.phone,
          createdAt: data2.createdAt,
          updatedAt: data2.updatedAt
        });
      });
    }
  });
};
//task 6.3
exports.deleteUser = (req, res) => {
  user.destroy({ where: { id: req.params.id } }).then(data => {
    if (data) {
      res.send({
        id: req.params.id
      });
    }
  });
};
//task 8.1
exports.addPremium = (req, res) => {
  const { no_rek, proof_of_transfer, status } = req.body;
  const insetPrem = {
    no_rek,
    proof_of_transfer,
    id_user: req.params.id,
    status
  };
  console.log(req.params.id);
  Premium.create(insetPrem).then(data => {
    if (data) {
      Premium.findOne({
        attributes: ["no_rek", "proof_of_transfer", "status"],
        include: [
          {
            model: user,
            attributes: [
              "id",
              "name",
              "address",
              "phone",
              "createdAt",
              "updatedAt"
            ],
            where: { id: req.params.id }
          }
        ]
      }).then(data => {
        res.send(data);
      });
    }
  });
};
//task 8.2
exports.updatePrem = (req, res) => {
  const { no_rek, proof_of_transfer, status } = req.body;
  const insetPrem = {
    no_rek,
    proof_of_transfer,
    id_user: req.params.id,
    status
  };
  Premium.update(req.body, {
    where: { id: req.params.id }
  }).then(data => {
    if (data) {
      Premium.findOne(req.body, {
        include: [
          {
            model: user,
            include: ["id"]
          }
        ],
        where: { id: req.params.id }
      }).then(data2 => {
        res.send(data2);
      });
    }
  });
};

//tbl_age
exports.insertAge = (req, res) => {
  age.create(req.body).then(age => {
    res.send({ message: "sukses", age });
  });
};

//tbl_spesies

//tbl_user
exports.insertUser = (req, res) => {
  user.create(req.body).then(user => {
    res.send({ message: "sukses", user });
  });
};

//tbl_pet
exports.insertPet = (req, res) => {
  pet.create(req.body).then(pet => {
    res.send({ message: "sukses", pet });
  });
};

//register

//task 4 pet 3

//task 4 pet 4

//task 6 1

// task 6 2

//task 6 3
