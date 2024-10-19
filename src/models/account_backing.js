// models/Banking.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banking = sequelize.define('Banking', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'banking',
  });

  return Banking;
};
