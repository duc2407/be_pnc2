'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    'Roles',
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
      tableName: 'roles',
    },
  );

  Roles.associate = (models) => {
    Roles.hasMany(models.Users, {
      foreignKey: 'id',
      as: 'users',
    });
  };

  return Roles;
};
