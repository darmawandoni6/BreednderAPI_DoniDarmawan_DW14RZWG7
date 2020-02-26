"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_payment = sequelize.define(
    "tbl_payment",
    {
      no_rek: DataTypes.STRING,
      proof_of_transfer: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {}
  );
  tbl_payment.associate = function(models) {
    // associations can be defined here
    // tbl_payment.belongsTo(models.tbl_users, {
    //   foreignKey: "id_user"
    // });
  };
  return tbl_payment;
};
