'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'status', // Đảm bảo tên bảng sử dụng chữ thường và có dấu gạch dưới nếu cần.
    timestamps: false,   // Nếu bảng không có các cột `createdAt` và `updatedAt`
  });

  Status.associate = (models) => {
    Status.hasMany(models.BookingSchedule, {
      foreignKey: 'status_id',
      as: 'booking_schedules',
    });
  };

  return Status;
};
