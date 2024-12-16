'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookingSchedule = sequelize.define(
    'BookingSchedule',
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_clinic: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      reDate: {
        type: DataTypes.STRING,
      },
      result: {
        type: DataTypes.STRING,
      },
      prescriptions_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'booking_schedule',
      timestamps: true,
    },
  );

  BookingSchedule.associate = (models) => {
    BookingSchedule.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    BookingSchedule.belongsTo(models.Clinic, {
      // Đảm bảo tên model chính xác
      foreignKey: 'id_clinic',
      as: 'clinic',
    });
    BookingSchedule.belongsTo(models.TimeSchedule, {
      foreignKey: 'id_time',
      as: 'time',
    });
    BookingSchedule.belongsTo(models.Status, {
      foreignKey: 'status_id',
      as: 'status',
    });
  };

  return BookingSchedule;
};
