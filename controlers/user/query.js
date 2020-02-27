const User = require("../../models").tbl_users;

//task 6.1
exports.user = async (req, res) => {
  try {
    const data = await User.findOne({ where: { id: req.params.id } });
    res.send({
      name: data.name,
      address: data.address,
      phone: data.phone,
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
//task 6.2
exports.updateUser = async (req, res) => {
  try {
    const data = await User.update(req.body, { where: { id: req.params.id } });
    if (data) {
      const data2 = await User.findOne({ where: { id: req.params.id } });
      res.send({
        name: data2.name,
        address: data2.address,
        phone: data2.phone,
        createdAt: data2.createdAt,
        updatedAt: data2.updatedAt
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};

//task 6.3
exports.deleteUser = async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });
    res.send({
      id: req.params.id
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "bad request"
    });
  }
};
