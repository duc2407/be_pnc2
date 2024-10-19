'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'cart',
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Cart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return Cart;
};
