'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      remainder: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      code_account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      number_phone: {
        type: Sequelize.STRING,
      },
      code_pin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};
