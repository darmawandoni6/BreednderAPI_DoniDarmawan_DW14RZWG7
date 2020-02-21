const jwt = require("jsonwebtoken");

const age = require("../models").tbl_age;
const species = require("../models").tbl_spesies;
const user = require("../models").tbl_user;
const pet = require("../models").tbl_pet;
const match = require("../models").match;
const akun = require("../models").akun;

//tbl_age
exports.insertAge = (req, res) => {
  age.create(req.body).then(age => {
    res.send({ message: "sukses", age });
  });
};

//tbl_spesies
exports.insertSpecies = (req, res) => {
  species.create(req.body).then(species => {
    res.send({ message: "sukses", species });
  });
};

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
exports.Register = (req, res) => {
  const body = req.body;
  const userBody = {
    name: body.name,
    email: body.email,
    pass: body.pass,
    phone: body.phone,
    address: body.address
  };
  user.create({ userBody }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, "darmawan");
      const petData = {
        name: body.pet.name,
        gender: body.pet.gender,
        id_spesies: body.id_spesies,
        age_id: body.age_id,
        email: body.email,
        about_pet: body.about_pet,
        photo: body.photo
      };
      pet.create({ petData }).then(pet => {
        if (pet) {
          res.send({
            email: user.email,
            token: token
          });
        }
      });
    }
  });
};
// survey = {
//   title: title,
//   description: description,
//   Questions:[
//     {
//       question_type: 'Radio',
//       question: 'q1',
//       Options:[
//         {
//           option: 'o1'
//         },
//         {
//           option: 'o2'
//         }
//       ]
//     }
//   ]
// }
// exports.Users = (req, res) => {
//   user.findAll().then(user => res.send(user));
// };

// exports.User = (req, res) => {
//   user
//     .findOne({ where: { email: req.params.email, pass: req.params.pass } })
//     .then(user => res.send(user));
// };
// exports.User2 = (req, res) => {
//   const email = req.body.email;
//   const name = req.body.name;
//   user.findOne({ where: { email, name } }).then(user => res.send(user));
// };

// exports.updateUser = (req, res) => {
//   user
//     .update(req.body, {
//       where: { id: req.params.id }
//     })
//     .then(user => {
//       res.send({
//         message: "sukses",
//         user
//       });
//     });
// };

// exports.deleteUser = (req, res) => {
//   user.destroy({ where: { id: req.params.id } }).then(user => {
//     res.send({
//       message: "success",
//       user
//     });
//   });
// };
