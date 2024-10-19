'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      number_phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_payment: {
        type: DataTypes.INTEGER,
      },
      id_cart: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
      },
      clinic_id: {
        type: DataTypes.INTEGER,
      },
      describe: {
        type: DataTypes.STRING,
      },
      authentication: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'users',
    },
  );

  Users.associate = (models) => {
    Users.hasMany(models.Notifications, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      as: 'roleIds',
    });
    Users.belongsTo(models.Departments, {
      foreignKey: 'department_id',
      as: 'department',
    });
    Users.belongsTo(models.Clinic, {
      foreignKey: 'clinic_id', // Khóa ngoại trỏ đến bảng Clinics
      as: 'clinic', // Alias hợp lý
    });
    Users.belongsTo(models.Payments, {
      foreignKey: 'id',
      as: 'payment',
    });
    Users.belongsTo(models.Cart, {
      foreignKey: 'id_cart',
      as: 'cart',
    });
  };

  return Users;
};
