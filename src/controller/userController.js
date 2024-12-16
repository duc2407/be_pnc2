import userService from '../services/userService';

let postCreateUser = async (req, res) => {
  let user = {
    email: req.body.email,
    password: req.body.password,
    roleId: 5,
    number_phone: req.body.number_phone,
    first_name: '',
    last_name: '',
    user_name: '',
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

let handleLoging = async (req, res) => {
  let account = req.body.email;
  let password = req.body.password;
  if (!account || !password || account == '' || password == '') {
    return res.status(500).json({
      status: 500,
      errCode: 1,
      message: 'Vui lòng nhập đầy đủ thông tin!',
    });
  }

  let userData = await userService.handleUserLogin(account, password);

  return res.status(200).json({
    status: userData.status,
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    adress: userData.adress,
  });
};

const updateUserController = async (req, res) => {
  try {
    let userData = { id: req.body.id, id_payment: req.body.id_payment };

    await userService.editUser(userData);

    return res
      .status(200)
      .json({ status: 200, message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateAvatar = async (req, res) => {
  try {
    let userData = { id: req.body.id, image: req.body.image };

    let user = await userService.editAvatarUser(userData);

    return res
      .status(200)
      .json({ status: 200, message: 'User updated successfully', user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postCreateUser: postCreateUser,
  handleLoging: handleLoging,
  updateUserController: updateUserController,
  updateAvatar: updateAvatar,
};
