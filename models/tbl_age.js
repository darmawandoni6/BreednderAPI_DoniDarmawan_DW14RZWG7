"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_age = sequelize.define(
    "tbl_age",
    {
      // id_age: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {}
  );
  tbl_age.associate = function(models) {
    // associations can be defined here
  };
  return tbl_age;
};
