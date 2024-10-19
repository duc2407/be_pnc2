'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define(
    'Clinic',
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
      describe: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_phone: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'clinic',
    },
  );

  Clinic.associate = (models) => {
    Clinic.hasMany(models.BookingSchedule, {
      foreignKey: 'id_clinic',
      as: 'bookingSchedules',
    });
    Clinic.hasMany(models.Users, {
      foreignKey: 'clinic_id', // Khóa ngoại ở bảng Users
      as: 'users', // Alias hợp lý
    });
    Clinic.hasMany(models.AddressClinic, {
      foreignKey: 'address_id',
      as: 'addressclinic',
    });
  };

  return Clinic;
};
