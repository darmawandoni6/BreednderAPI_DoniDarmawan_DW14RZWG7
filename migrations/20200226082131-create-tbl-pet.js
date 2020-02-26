"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
        // allowNull: false,
        // references: {
        //   model: "tbl_users",
        //   key: "id"
        // },
        // onUpdate: "cascade",
        // onDelete: "cascade"
      },
      id_sepesies: {
        type: Sequelize.INTEGER
        // allowNull: false,
        // references: {
        //   model: "tbl_spesies",
        //   key: "id"
        // },
        // onUpdate: "cascade",
        // onDelete: "cascade"
      },
      age: {
        type: Sequelize.ENUM(["Teeneger", "Child", "Adult"])
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM(["Male", "Female"])
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
