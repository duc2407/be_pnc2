'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_schedule', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_clinic: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clinic',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_time: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'status',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      result: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prescriptions_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'prescriptions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Giá trị mặc định là thời gian hiện tại
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Giá trị mặc định là thời gian hiện tại
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_schedule');
  },
};
