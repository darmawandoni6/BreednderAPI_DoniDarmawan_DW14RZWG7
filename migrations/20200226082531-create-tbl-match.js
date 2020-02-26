"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      id_pet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_pets",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_like: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_pets",
          key: "id"
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
