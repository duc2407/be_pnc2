'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define('Departments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'departments',
  });

  return Departments;
};
