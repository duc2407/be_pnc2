import db from '../models';

let getDiseases = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let diseases = await db.ExpertDiseases.findAll({
        include: [
          {
            model: symptoms,
            as: 'symptoms',
          },
        ],
      });
      resolve(diseases);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllSymptom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let symptom = await db.Symptoms.findAll({
        //   include: [
        //     {
        //       model: Symptoms,
        //       as: 'symptoms',
        //     },
        //   ],
      });
      resolve(symptom);
    } catch (e) {
      reject(e);
    }
  });
};

let diagnose = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { symptom_ids } = data;
      console.log('Symptom IDs:', symptom_ids);

      // Kiểm tra xem symptom_ids có phải là mảng không
      if (!Array.isArray(symptom_ids) || symptom_ids.length === 0) {
        throw new Error('Invalid symptom_ids input');
      }

      const rules = await DiagnosisRules.findAll({
        where: {
          symptom_id: symptom_ids,
        },
        include: [
          {
            model: db.Symptoms,
            as: 'symptom',
          },
          {
            model: db.ExpertDiseases,
            as: 'expertDisease',
          },
        ],
      });

      console.log('Diagnosis Rules Found:', rules);

      const diseases = rules.map((rule) => {
        return {
          id: rule.disease.id,
          name: rule.disease.name,
        };
      });

      // Lọc các bệnh trùng lặp
      const uniqueDiseases = diseases.filter(
        (disease, index, self) =>
          index === self.findIndex((d) => d.id === disease.id),
      );

      resolve(uniqueDiseases);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDiseases: getDiseases,
  diagnose: diagnose,
  getAllSymptom: getAllSymptom,
};
