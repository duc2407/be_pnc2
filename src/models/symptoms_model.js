'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symptoms = sequelize.define('Symptoms', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'symptoms',
  });

  Symptoms.associate = (models) => {
    Symptoms.belongsTo(models.ExpertDiseases, {
      foreignKey: 'disease_id',
      as: 'disease',
    });
    Symptoms.hasMany(models.DiagnosisRules, {
      foreignKey: 'symptom_id',
      as: 'diagnosisRules',
    });
  };

  return Symptoms;
};
