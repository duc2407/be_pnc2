'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      detail_cart: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'cart',
    },
  );

  // Cart.associate = (models) => {
  //   Cart.belongsTo(models.Users, {
  //     foreignKey: 'user_id',
  //     as: 'user',
  //   });
  //   // Cart.belongsTo(models.Product, {
  //   //   foreignKey: 'product_id',
  //   //   as: 'product',
  //   // });
  // };

  return Cart;
};
