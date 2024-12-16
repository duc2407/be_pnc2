// models/Prescriptions.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adress = sequelize.define(
    'Adress',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'adress',
    },
  );

  return Adress;
};
