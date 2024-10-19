import bcrypt from 'bcryptjs';
import db from '../models';

let salt = 7;
let checkEmailSignUp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let aboutUser = await db.Users.findOne({ where: { email: email } });
      if (aboutUser) {
        resolve(false); // Email đã tồn tại
      } else {
        resolve(true); // Email không tồn tại
      }
    } catch (error) {
      reject(error); // Xử lý lỗi nếu có
    }
  });
};
let checkNumberPhoneSignUp = (number_phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let aboutUser = await db.Users.findOne({
        where: { number_phone: number_phone },
      });
      if (aboutUser) {
        resolve(false); // number_phone đã tồn tại
      } else {
        resolve(true); // number_phone không tồn tại
      }
    } catch (error) {
      reject(error); // Xử lý lỗi nếu có
    }
  });
};
let createNewUser = (user) => {
  user.password = bcrypt.hashSync(user.password, salt);
  return new Promise(async (resolve, reject) => {
    let newUser = await db.Users.create(user);
    resolve(newUser);
  });
};
let handleUserLogin = (account, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = null;

      // Check if 'account' is email or phone number
      let isEmailExist = await checkEmailSignUp(account);
      let isNumberExist = await checkNumberPhoneSignUp(account);

      if (!isEmailExist) {
        user = await db.Users.findOne({
          where: { email: account },
          include: [
            { model: db.Payments, as: 'payment' }, // Include Payment
            { model: db.Cart, as: 'cart' }, // Include Cart
          ],
        });
      } else if (!isNumberExist) {
        user = await db.Users.findOne({
          where: { number_phone: account },
          include: [
            { model: db.Payments, as: 'payment' }, // Include Payment
            { model: db.Cart, as: 'cart' }, // Include Cart
          ],
        });
      }

      if (user) {
        // Check password
        let check = await bcrypt.compare(password, user.password);

        if (check) {
          userData.status = 200;
          userData.errCode = 0;
          userData.errMessage = 'OK';

          delete user.password; // Remove password from response
          userData.user = user;
        } else {
          userData.status = 500;
          userData.errCode = 3;
          userData.errMessage = 'Wrong password';
        }
      } else {
        userData.status = 501;
        userData.errCode = 2;
        userData.errMessage = 'User not found';
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: data.id },
      });

      if (!user) {
        return reject(new Error('User not found'));
      }

      let updatedData = {};
      if (data.id_payment) updatedData.id_payment = data.id_payment; // Giả sử có thuộc tính phone
      // Tiếp tục cho các thuộc tính khác nếu cần

      // Cập nhật chỉ những thuộc tính đã thay đổi
      await user.update(updatedData);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      await user.destroy(id);
      resolve('delete thanh cong');
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  checkEmailSignUp: checkEmailSignUp,
  createNewUser: createNewUser,
  checkNumberPhoneSignUp: checkNumberPhoneSignUp,
  handleUserLogin: handleUserLogin,
  editUser: editUser,
  deleteUser: deleteUser,
};
