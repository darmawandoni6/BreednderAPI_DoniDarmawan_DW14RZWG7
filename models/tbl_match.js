"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_match = sequelize.define(
    "tbl_match",
    {
      status: DataTypes.BOOLEAN,
      id_pet: DataTypes.INTEGER,
      id_like: DataTypes.INTEGER
    },
    {}
  );
  tbl_match.associate = function(models) {
    // associations can be defined here
    tbl_match.belongsTo(models.tbl_pet, {
      foreignKey: "id_pet",
      as: "pet"
    });
    tbl_match.belongsTo(models.tbl_pet, {
      foreignKey: "id_like",
      as: "pet_liked"
    });
  };
  return tbl_match;
};
