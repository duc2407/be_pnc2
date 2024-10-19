'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnosis_rules', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      disease_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'expert_diseases',
          key: 'id',
        },
      },
      symptom_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'symptoms',
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
    await queryInterface.dropTable('diagnosis_rules');
  },
};
