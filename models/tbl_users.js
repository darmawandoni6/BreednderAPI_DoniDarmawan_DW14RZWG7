'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_users = sequelize.define('tbl_users', {
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  tbl_users.associate = function(models) {
    // associations can be defined here
  };
  return tbl_users;
};