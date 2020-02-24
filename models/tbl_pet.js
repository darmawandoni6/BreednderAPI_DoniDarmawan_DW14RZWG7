"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_pet = sequelize.define(
    "tbl_pet",
    {
      id_user: DataTypes.INTEGER,
      id_sepesies: DataTypes.INTEGER,
      age: DataTypes.STRING,
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
      about_pet: DataTypes.STRING
    },
    {}
  );
  tbl_pet.associate = function(models) {
    // associations can be defined here
    tbl_pet.belongsTo(models.tbl_spesies, {
      foreignKey: "id_sepesies"
    });
    tbl_pet.belongsTo(models.tbl_user, {
      foreignKey: "id_user"
    });
  };
  return tbl_pet;
};
