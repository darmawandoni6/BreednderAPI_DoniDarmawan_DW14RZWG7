"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_pet = sequelize.define(
    "tbl_pet",
    {
      email: DataTypes.STRING,
      id_sepesies: DataTypes.INTEGER,
      id_age: DataTypes.INTEGER,
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
      about_pet: DataTypes.STRING
    },
    {}
  );
  tbl_pet.associate = function(models) {
    // associations can be defined here
  };
  return tbl_pet;
};
