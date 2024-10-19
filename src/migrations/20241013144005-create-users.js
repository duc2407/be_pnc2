'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      number_phone: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_payment: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'payments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_cart: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'cart',
        //   key: 'id',
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL',
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      department_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      clinic_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      describe: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      OTP: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      authentication: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('users');
  },
};
