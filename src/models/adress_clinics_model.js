'use strict';
module.exports = (sequelize, DataTypes) => {
  const AddressClinic = sequelize.define('AddressClinic', {
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
    tableName: 'address_clinic',
  });
  
  return AddressClinic;
};
