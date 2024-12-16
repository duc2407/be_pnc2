const diagnosisService = require('../services/diagnosisService');

let getDiseases = async (req, res) => {
  try {
    const diseases = await diagnosisService.getDiseases();
    if (diseases.length === 0) {
      return res.status(204).json({ message: 'No diseases found' });
    }
    return res.status(200).json({ status: 200, data: diseases });
  } catch (error) {
    console.error('Error getting diseases:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

let diagnose = async (req, res) => {
  try {
    if (!req.body.symptom_ids) {
      return res.status(400).json({ message: 'Missing symptom_ids' });
    }
    const diseases = await diagnosisService.diagnose(req.body);
    if (diseases.length === 0) {
      return res.status(204).json({ message: 'No diagnoses found' });
    }
    return res.status(200).json({ status: 200, data: diseases });
  } catch (error) {
    console.error('Error during diagnosis:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
let handleGetAllSymptom = async (req, res) => {
  let symptoms = await diagnosisService.getAllSymptom();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    symptoms: symptoms,
  });
};

module.exports = {
  diagnose: diagnose,
  getDiseases: getDiseases,
  handleGetAllSymptom: handleGetAllSymptom,
};
