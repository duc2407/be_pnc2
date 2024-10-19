'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define(
    'Payments',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      remainder: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      code_account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      number_phone: {
        type: DataTypes.STRING,
      },
      code_pin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'payments',
    },
  );

  Payments.associate = (models) => {
    Payments.belongsTo(models.Users, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return Payments;
};
