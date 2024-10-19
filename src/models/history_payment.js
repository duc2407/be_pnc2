'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoryPayment = sequelize.define('HistoryPayment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'history_payment',
  });

  HistoryPayment.associate = (models) => {
    HistoryPayment.belongsTo(models.Payments, {
      foreignKey: 'id_payment',
      as: 'payment',
    });
  };

  return HistoryPayment;
};
