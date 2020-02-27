const Pet = require("../models").tbl_pet;
const Species = require("../models").tbl_spesies;
const User = require("../models").tbl_users;
const Premium = require("../models").tbl_payment;

// pet
exports.petAll = async (req, res) => {
  try {
    const data = await Pet.findAll();
    res.send(data);
  } catch (error) {
    res.send({
      Message: "Error"
    });
  }
};
// spesies
exports.speciesAll = async (req, res) => {
  try {
    const data = await Species.findAll();
    res.send(data);
  } catch (error) {
    res.send({
      Message: "Error"
    });
  }
};
// user
exports.userAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (error) {
    res.send({
      Message: "Error"
    });
  }
};
// Payment
exports.paymentAll = async (req, res) => {
  try {
    const data = await Premium.findAll();
    res.send(data);
  } catch (error) {
    res.send({
      Message: "Error"
    });
  }
};
