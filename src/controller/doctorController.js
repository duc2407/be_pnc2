import doctorService from '../services/doctorService';
let handleLoging = async (req, res) => {
  let account = req.body.email;
  let password = req.body.password;
  if (!account || !password) {
    return res.status(500).json({
      status: 500,
      errCode: 1,
      message: 'Missing inputs parameter!',
    });
  }
  let userData = await doctorService.handleManagementLogin(account, password);

  return res.status(200).json({
    status: userData.status,
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.management ? userData.management : {},
  });
};
module.exports = {
  handleLoging: handleLoging,
};
