'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'type_product',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      sale: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      quality: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_unit: {
        type: Sequelize.STRING,
      },
      describe: {
        type: Sequelize.STRING,
      },
      user_manual: {
        type: Sequelize.STRING,
      },
      Sold: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      id_comment: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('product');
  },
};
