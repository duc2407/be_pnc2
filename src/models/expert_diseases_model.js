'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpertDiseases = sequelize.define('ExpertDiseases', {
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
    tableName: 'expert_diseases',
  });

  ExpertDiseases.associate = (models) => {
    ExpertDiseases.hasMany(models.Symptoms, {
      foreignKey: 'disease_id',
      as: 'symptoms',
    });
    ExpertDiseases.hasMany(models.DiagnosisRules, {
      foreignKey: 'disease_id',
      as: 'diagnosisRules',
    });
  };

  return ExpertDiseases;
};
