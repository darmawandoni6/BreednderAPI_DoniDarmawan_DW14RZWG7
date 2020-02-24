const Premium = require("../../models").tbl_payment;
const User = require("../../models").tbl_user;
const jwt = require("jsonwebtoken");

const verifyJwt = jwtHeader => {
  let jwtData;
  let authorization = jwtHeader.split(" ")[1],
    decoded;
  try {
    decoded = jwt.verify(authorization, "darmawan");
    jwtData = {
      error: false,
      values: decoded
    };
  } catch (e) {
    jwtData = {
      error: true,
      values: null
    };
    console.log(e);
  }
  return jwtData;
};

//task 8.1
exports.addPremium = async (req, res) => {
  try {
    const jwtData = verifyJwt(req.headers.authorization);
    const { no_rek, proof_of_transfer, status } = req.body;
    const insetPrem = {
      no_rek,
      proof_of_transfer,
      id_user: jwtData.values.userId,
      status
    };
    const data = await Premium.create(insetPrem);
    if (data) {
      const data2 = await Premium.findOne({
        attributes: ["no_rek", "proof_of_transfer", "status"],
        include: [
          {
            model: User,
            attributes: [
              "id",
              "name",
              "address",
              "phone",
              "createdAt",
              "updatedAt"
            ]
          }
        ],
        where: { id: jwtData.values.userId }
      });
      res.send({
        no_rek: data2.no_rek,
        proof_of_transfer: data2.proof_of_transfer,
        users: {
          id: jwtData.values.userId,
          name: data2.tbl_user.name,
          address: data2.tbl_user.address,
          phone: data2.tbl_user.phone,
          createdAt: data2.tbl_user.createdAt,
          updatedAt: data2.tbl_user.updatedAt
        }
      });
    }
  } catch (error) {
    res.status(404).send({ status: "error" });
  }
};

//task 8.2
exports.updatePrem = async (req, res) => {
  try {
    const { no_rek, proof_of_transfer, status } = req.body;
    const insetPrem = {
      no_rek,
      proof_of_transfer,
      status
    };
    const data = await Premium.update(insetPrem, {
      where: { id: req.params.id }
    });
    if (data) {
      const data2 = await Premium.findOne({
        include: [
          {
            model: User
          }
        ],
        where: { id: req.params.id }
      });
      res.send({
        no_rek: data2.no_rek,
        proof_of_transfer: data2.proof_of_transfer,
        users: {
          id: data2.tbl_user.id,
          name: data2.tbl_user.name,
          address: data2.tbl_user.address,
          phone: data2.tbl_user.phone,
          createdAt: data2.tbl_user.createdAt,
          updatedAt: data2.tbl_user.updatedAt
        },
        status: data2.status
      });
    }
  } catch (error) {
    res.send({ Message: "Error" });
  }
};
