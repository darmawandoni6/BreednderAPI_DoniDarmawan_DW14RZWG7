"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_matches", {
      id_match: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_email: {
        type: Sequelize.STRING,
        references: {
          model: "tbl_users",
          key: "email"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_pet: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_pets",
          key: "id_pet"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
    return queryInterface.dropTable("tbl_matches");
  }
};
