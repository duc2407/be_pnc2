'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeProduct = sequelize.define('TypeProduct', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'type_product',
  });

  TypeProduct.associate = (models) => {
    TypeProduct.hasMany(models.Product, {
      foreignKey: 'id_type',
      as: 'products',
    });
  };

  return TypeProduct;
};
