'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sale: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quality: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unit: {
      type: DataTypes.STRING,
    },
    describe: {
      type: DataTypes.STRING,
    },
    user_manual: {
      type: DataTypes.STRING,
    },
    Sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_comment: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'product',
  });

  Product.associate = (models) => {
    Product.belongsTo(models.TypeProduct, {
      foreignKey: 'id_type',
      as: 'type',
    });
    Product.belongsTo(models.Users, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
  };

  return Product;
};
