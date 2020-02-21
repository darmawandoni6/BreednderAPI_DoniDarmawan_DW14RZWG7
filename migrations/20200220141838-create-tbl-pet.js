"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_pets", {
      id_pet: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        references: {
          model: "tbl_users",
          key: "email"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_sepesies: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_spesies",
          key: "id_spesies"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_age: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_ages",
          key: "id_age"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      about_pet: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("tbl_pets");
  }
};
