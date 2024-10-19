// models/Prescriptions.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescriptions = sequelize.define('Prescriptions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    booking_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: 'prescriptions',
  });

  Prescriptions.associate = (models) => {
    Prescriptions.belongsTo(models.BookingSchedule, {
      foreignKey: 'prescriptions_id',
      as: 'booking_schedule',
    });
    Prescriptions.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return Prescriptions;
};
