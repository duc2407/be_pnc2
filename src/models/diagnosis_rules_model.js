'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiagnosisRules = sequelize.define('DiagnosisRules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symptom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'diagnosis_rules',
  });

  DiagnosisRules.associate = (models) => {
    DiagnosisRules.belongsTo(models.ExpertDiseases, {
      foreignKey: 'disease_id',
      as: 'disease',
    });
    DiagnosisRules.belongsTo(models.Symptoms, {
      foreignKey: 'symptom_id',
      as: 'symptom',
    });
  };

  return DiagnosisRules;
};
