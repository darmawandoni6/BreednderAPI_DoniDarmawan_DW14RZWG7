'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_user = sequelize.define('tbl_user', {
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  tbl_user.associate = function(models) {
    // associations can be defined here
  };
  return tbl_user;
};