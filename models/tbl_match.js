'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_match = sequelize.define('tbl_match', {
    id_email: DataTypes.STRING,
    id_pet: DataTypes.INTEGER
  }, {});
  tbl_match.associate = function(models) {
    // associations can be defined here
  };
  return tbl_match;
};