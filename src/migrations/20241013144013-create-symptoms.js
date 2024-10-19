'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('symptoms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disease_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'expert_diseases',
          key: 'id',
        },
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
    await queryInterface.dropTable('symptoms');
  },
};
