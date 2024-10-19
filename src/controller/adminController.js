import adminService from '../services/adminService';
import userService from '../services/userService';
let postCreateDoctorSaleExpert = async (req, res) => {
  let user = {
    email: req.body.email,
    user_name: req.body.user_name,
    password: req.body.password,
    roleId: req.body.roleId,
    number_phone: req.body.number_phone,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    clinic_id: req.body.clinic_id,
    department_id: req.body.department_id,
    describe: req.body.describe,
  };
  try {
    let emailAvailable = await userService.checkEmailSignUp(req.body.email);
    let numberPhoneAvailable = await userService.checkNumberPhoneSignUp(
      req.body.number_phone,
    );
    if (req.body.email == '') {
      return res
        .status(202)
        .json({ status: 202, message: 'Vui lòng không để trống Email.' });
    } else if (emailAvailable && numberPhoneAvailable) {
      await userService.createNewUser(user);
      res.status(200).json({ status: 200, message: 'Đăng kí thành công.' });
    } else {
      return res.status(201).json({
        status: 201,
        message: 'Email hoặc số điện thoại này đã đăng kí tài khoản.',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
let handleGetAllUsers = async (req, res) => {
  let users = await adminService.getAllUsers();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    user: users,
  });
};
let handleGetAllDoctor = async (req, res) => {
  let users = await adminService.getAllDoctors();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    user: users,
  });
};
let handleGetAllSale = async (req, res) => {
  let users = await adminService.getAllSales();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    user: users,
  });
};
let handleGetAllExpert = async (req, res) => {
  let users = await adminService.getAllExperts();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    user: users,
  });
};
module.exports = {
  postCreateDoctorSaleExpert: postCreateDoctorSaleExpert,
  handleGetAllUsers: handleGetAllUsers,
  handleGetAllDoctor: handleGetAllDoctor,
  handleGetAllSale: handleGetAllSale,
  handleGetAllExpert: handleGetAllExpert,
};
