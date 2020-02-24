const Species = require("../../models").tbl_spesies;

exports.insertSpecies = (req, res) => {
  Species.create(req.body).then(data => {
    res.send({
      id: data.id,
      name: data.name
    });
  });
};

exports.spesiesAll = (req, res) => {
  Species.findAll().then(data => {
    res.send(data);
  });
};
