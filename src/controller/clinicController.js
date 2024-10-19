import clinicService from '../services/clinicService';
let handleGetAllClinics = async (req, res) => {
  let users = await clinicService.getAllClinics();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    user: users,
  });
};
module.exports = { handleGetAllClinics: handleGetAllClinics };
