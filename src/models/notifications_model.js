'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'notifications',
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Users, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
  };

  return Notifications;
};
