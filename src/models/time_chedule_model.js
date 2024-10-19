// models/TimeSchedule.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const TimeSchedule = sequelize.define(
    'TimeSchedule',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'timeschedules',
    },
  );

  // TimeSchedule.associate = (models) => {
  //   TimeSchedule.hasMany(models.BookingSchedule, {
  //     foreignKey: 'id_time',
  //     as: 'id',
  //   });
  // };

  return TimeSchedule;
};
