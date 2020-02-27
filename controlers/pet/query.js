const Pet = require("../../models").tbl_pet;
const Species = require("../../models").tbl_spesies;
const User = require("../../models").tbl_users;
const Premium = require("../../models").tbl_payment;

//task 4.1
exports.addPet = async (req, res) => {
  try {
    const search = await Premium.findOne({
      where: { id_user: req.body.id_user }
    });
    if (search.status == "Premium") {
      const data = await Pet.create(req.body);
      if (data) {
        console.log(data.id);

        const data2 = await Pet.findOne({
          where: { id: data.id },
          include: [
            { model: Species, attributes: ["name"] },
            { model: User, attributes: ["name"] }
          ]
        });
        res.send({
          id: data2.id,
          name: data2.name,
          gender: data2.gender,
          spesies: data2.tbl_spesy.name,
          age: data2.age,
          user: data2.tbl_user.name,
          about_pet: data2.about_pet,
          photo: data2.photo
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "bad request"
        });
      }
    } else {
      res.send({
        message: "this is not a premium accoun"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};

//task 4.2
exports.petAllJoin = async (req, res) => {
  try {
    const data = await Pet.findAll({
      attributes: [
        "id",
        "name",
        "gender",
        "age",
        "about_pet",
        "photo",
        "createdAt",
        "updatedAt"
      ],
      include: [
        {
          model: Species,
          attributes: ["id", "name"]
        },
        {
          model: User,
          attributes: ["id", "name", "address", "phone"]
        }
      ]
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};

//task 4.3
exports.updatePet = async (req, res) => {
  try {
    const { name, gender, spesies, age, about_pet, photo, user } = req.body;
    const addPet = {
      id_sepesies: spesies.id,
      age,
      name,
      gender,
      photo,
      about_pet,
      id_user: user.id
    };
    const data = await Pet.update(addPet, { where: { id: req.params.id } });
    if (data) {
      const data2 = await Pet.findOne({
        include: [{ model: Species }, { model: User }],
        where: { id: req.params.id }
      });
      res.send({
        id: req.params.id,
        name: data2.name,
        gender: data2.gender,
        spesies: {
          id: data2.tbl_spesy.id,
          name: data2.tbl_spesy.name
        },
        age: data2.age,
        user: {
          id: data2.tbl_user.id,
          name: data2.tbl_user.name,
          address: data2.tbl_user.address,
          Phone: data2.tbl_user.phone
        },
        about_pet: data2.about_pet,
        photo: data2.photo
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "bad request"
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};

//Taks 4.4
exports.deletePet = async (req, res) => {
  try {
    const data = await Pet.destroy({ where: { id: req.params.id } });
    res.send({ id: req.params.id });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
//task 5
exports.allPet = async (req, res) => {
  try {
    const data = await Pet.findOne({
      include: [
        {
          model: Species,
          attributes: ["id", "name"]
        },
        {
          model: User,
          attributes: ["id", "name", "address", "phone"]
        }
      ],
      where: { id: req.params.id },
      attributes: [
        "id",
        "name",
        "gender",
        "about_pet",
        "photo",
        "about_pet",
        "createdAt",
        "updatedAt"
      ]
    });
    res.send({
      id: data.id,
      name: data.name,
      gender: data.gender,
      about_pet: data.about_pet,
      photo: data.photo,
      spesies: {
        id: data.tbl_spesy.id,
        name: data.tbl_spesy.name
      },
      user: {
        id: data.tbl_user.id,
        name: data.tbl_user.name,
        address: data.tbl_user.address,
        phone: data.tbl_user.phone
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
