import db from '../models';
let getAllClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findAll();
      resolve(clinic);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { getAllClinics: getAllClinics };
