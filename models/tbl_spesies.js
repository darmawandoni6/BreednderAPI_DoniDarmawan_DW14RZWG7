'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_spesies = sequelize.define('tbl_spesies', {
    name: DataTypes.STRING
  }, {});
  tbl_spesies.associate = function(models) {
    // associations can be defined here
  };
  return tbl_spesies;
};