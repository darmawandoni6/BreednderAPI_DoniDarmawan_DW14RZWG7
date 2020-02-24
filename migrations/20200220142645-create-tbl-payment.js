"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_rek: {
        type: Sequelize.STRING
      },
      proof_of_transfer: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      status: {
        type: Sequelize.ENUM(["Free", "Premium"])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_payments");
  }
};
