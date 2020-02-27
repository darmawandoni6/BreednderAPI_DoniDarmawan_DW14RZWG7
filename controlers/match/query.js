const Match = require("../../models").tbl_match;
const Pet = require("../../models").tbl_pet;
const Species = require("../../models").tbl_spesies;
const User = require("../../models").tbl_users;

//task 7.1
exports.chekMatch = async (req, res) => {
  try {
    const q = req.query;
    const data2 = await Match.findOne({
      where: { id_pet: q.param1, id_like: q.param2 },
      include: [
        {
          model: Pet,
          as: "pet",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        },
        {
          model: Pet,
          as: "pet_liked",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        }
      ]
    });

    if (data2) {
      res.send({
        id: data2.id,
        status: data2.status,
        pet: {
          id: data2.pet.id,
          name: data2.pet.name,
          gender: data2.pet.gender,
          spesies: {
            id: data2.pet.tbl_spesy.id,
            name: data2.pet.tbl_spesy.name
          },
          user: {
            id: data2.pet.tbl_user.id,
            name: data2.pet.tbl_user.name,
            address: data2.pet.tbl_user.address,
            phone: data2.pet.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        pet_liked: {
          id: data2.pet_liked.id,
          name: data2.pet_liked.name,
          gender: data2.pet_liked.gender,
          spesies: {
            id: data2.pet_liked.tbl_spesy.id,
            name: data2.pet_liked.tbl_spesy.name
          },
          user: {
            id: data2.pet_liked.tbl_user.id,
            name: data2.pet_liked.tbl_user.name,
            address: data2.pet_liked.tbl_user.address,
            phone: data2.pet_liked.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        createdAt: data2.createdAt,
        updatedAt: data2.updatedAt
      });
    } else {
      const data3 = await Match.findOne({
        where: { id_pet: q.param2, id_like: q.param1 },
        include: [
          {
            model: Pet,
            as: "pet",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          },
          {
            model: Pet,
            as: "pet_liked",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          }
        ]
      });
      if (data3) {
        res.send({
          id: data3.id,
          status: data3.status,
          pet: {
            id: data3.pet.id,
            name: data3.pet.name,
            gender: data3.pet.gender,
            spesies: {
              id: data3.pet.tbl_spesy.id,
              name: data3.pet.tbl_spesy.name
            },
            user: {
              id: data3.pet.tbl_user.id,
              name: data3.pet.tbl_user.name,
              address: data3.pet.tbl_user.address,
              phone: data3.pet.tbl_user.phone
            },
            about_pet: data3.pet.about_pet,
            photo: data3.pet.photo
          },
          pet_liked: {
            id: data3.pet_liked.id,
            name: data3.pet_liked.name,
            gender: data3.pet_liked.gender,
            spesies: {
              id: data3.pet_liked.tbl_spesy.id,
              name: data3.pet_liked.tbl_spesy.name
            },
            user: {
              id: data3.pet_liked.tbl_user.id,
              name: data3.pet_liked.tbl_user.name,
              address: data3.pet_liked.tbl_user.address,
              phone: data3.pet_liked.tbl_user.phone
            },
            about_pet: data3.pet.about_pet,
            photo: data3.pet.photo
          },
          createdAt: data3.createdAt,
          updatedAt: data3.updatedAt
        });
      } else {
        res.status(204).send({
          Message: "204"
        });
      }
    }
  } catch (error) {
    res.status(404).send({
      Message: "204"
    });
  }
};

//task 7.2
//create
exports.match = async (req, res) => {
  try {
    const { status, pet_id, pet_id_liked } = req.body;
    const matchData = {
      status,
      id_pet: pet_id,
      id_like: pet_id_liked
    };
    const data = await Match.create(matchData);
    const data2 = await Match.findOne({
      where: { id: data.id },
      include: [
        {
          model: Pet,
          as: "pet",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        },
        {
          model: Pet,
          as: "pet_liked",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        }
      ]
    });
    res.send({
      //   data2
      id: data2.id,
      status: data2.status,
      pet: {
        id: data2.pet.id,
        name: data2.pet.name,
        gender: data2.pet.gender,
        spesies: {
          id: data2.pet.tbl_spesy.id,
          name: data2.pet.tbl_spesy.name
        },
        user: {
          id: data2.pet.tbl_user.id,
          name: data2.pet.tbl_user.name,
          address: data2.pet.tbl_user.address,
          phone: data2.pet.tbl_user.phone
        },
        about_pet: data2.pet.about_pet,
        photo: data2.pet.photo
      },
      pet_liked: {
        id: data2.pet_liked.id,
        name: data2.pet_liked.name,
        gender: data2.pet_liked.gender,
        spesies: {
          id: data2.pet_liked.tbl_spesy.id,
          name: data2.pet_liked.tbl_spesy.name
        },
        user: {
          id: data2.pet_liked.tbl_user.id,
          name: data2.pet_liked.tbl_user.name,
          address: data2.pet_liked.tbl_user.address,
          phone: data2.pet_liked.tbl_user.phone
        },
        about_pet: data2.pet.about_pet,
        photo: data2.pet.photo
      },
      createdAt: data2.createdAt,
      updatedAt: data2.updatedAt
    });
  } catch (error) {
    res.send({
      error: "error"
    });
  }
};
//update
exports.matchUpdate = async (req, res) => {
  try {
    const { status, pet_id, pet_id_liked } = req.body;
    const matchData = {
      status,
      id_pet: pet_id,
      id_like: pet_id_liked
    };

    const data = await Match.update(matchData, {
      where: { id: req.params.id }
    });
    if (data) {
      const data2 = await Match.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Pet,
            as: "pet",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          },
          {
            model: Pet,
            as: "pet_liked",
            include: [
              {
                model: User
              },
              {
                model: Species
              }
            ]
          }
        ]
      });
      res.send({
        //   data2
        id: data2.id,
        status: data2.status,
        pet: {
          id: data2.pet.id,
          name: data2.pet.name,
          gender: data2.pet.gender,
          spesies: {
            id: data2.pet.tbl_spesy.id,
            name: data2.pet.tbl_spesy.name
          },
          user: {
            id: data2.pet.tbl_user.id,
            name: data2.pet.tbl_user.name,
            address: data2.pet.tbl_user.address,
            phone: data2.pet.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        pet_liked: {
          id: data2.pet_liked.id,
          name: data2.pet_liked.name,
          gender: data2.pet_liked.gender,
          spesies: {
            id: data2.pet_liked.tbl_spesy.id,
            name: data2.pet_liked.tbl_spesy.name
          },
          user: {
            id: data2.pet_liked.tbl_user.id,
            name: data2.pet_liked.tbl_user.name,
            address: data2.pet_liked.tbl_user.address,
            phone: data2.pet_liked.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        createdAt: data2.createdAt,
        updatedAt: data2.updatedAt
      });
    } else res.status(404).send({ Message: "Not found" });
  } catch (error) {
    res.send({
      error: "error"
    });
  }
};

//get data match
exports.dataMath = async (req, res) => {
  try {
    const q = req.query;

    const data2 = await Match.findOne({
      where: { id_pet: q.param1, status: q.param2 },
      include: [
        {
          model: Pet,
          as: "pet",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        },
        {
          model: Pet,
          as: "pet_liked",
          include: [
            {
              model: User
            },
            {
              model: Species
            }
          ]
        }
      ]
    });
    if (data2) {
      res.send({
        //   data2
        id: data2.id,
        status: data2.status,
        pet: {
          id: data2.pet.id,
          name: data2.pet.name,
          gender: data2.pet.gender,
          spesies: {
            id: data2.pet.tbl_spesy.id,
            name: data2.pet.tbl_spesy.name
          },
          user: {
            id: data2.pet.tbl_user.id,
            name: data2.pet.tbl_user.name,
            address: data2.pet.tbl_user.address,
            phone: data2.pet.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        pet_liked: {
          id: data2.pet_liked.id,
          name: data2.pet_liked.name,
          gender: data2.pet_liked.gender,
          spesies: {
            id: data2.pet_liked.tbl_spesy.id,
            name: data2.pet_liked.tbl_spesy.name
          },
          user: {
            id: data2.pet_liked.tbl_user.id,
            name: data2.pet_liked.tbl_user.name,
            address: data2.pet_liked.tbl_user.address,
            phone: data2.pet_liked.tbl_user.phone
          },
          about_pet: data2.pet.about_pet,
          photo: data2.pet.photo
        },
        createdAt: data2.createdAt,
        updatedAt: data2.updatedAt
      });
    } else {
      res.status(402).send({ Message: "No Match" });
    }
  } catch (error) {
    res.status(400).send({ Message: "Bad request" });
  }
};
