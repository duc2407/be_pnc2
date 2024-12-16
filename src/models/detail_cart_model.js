'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailCart = sequelize.define(
    'DetailCart',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_cart: {
        type: DataTypes.INTEGER,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        value: 1,
      },
    },
    {
      tableName: 'detailcart',
    },
  );

  return DetailCart;
};
