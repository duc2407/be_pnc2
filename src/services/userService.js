import bcrypt from 'bcryptjs';
import db from '../models';
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
let salt = 7;
const handleUserLogin = (account, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = null;

      // Kiểm tra xem 'account' có phải là email hay số điện thoại
      user = await db.Users.findOne({
        where: {
          [Op.or]: [{ email: account }, { number_phone: account }],
        },
        include: [
          { model: db.Payments, as: 'payment' }, // Bao gồm Payment
          { model: db.Cart, as: 'cart' }, // Bao gồm Cart
        ],
        attributes: { exclude: ['password'] }, // Không bao gồm password
      });
      const adress = await db.Adress.findOne({
        where: {
          id_user: user.id, // Sử dụng user.id để lấy địa chỉ tương ứng
        },
      });
      if (user) {
        // Lưu mật khẩu vào biến tạm thời để kiểm tra
        const passwordHash = await db.Users.findOne({
          where: {
            [Op.or]: [{ email: account }, { number_phone: account }],
          },
          attributes: ['password'], // Chỉ lấy password
        });

        // Kiểm tra mật khẩu
        if (passwordHash && passwordHash.password) {
          const isPasswordValid = await bcrypt.compare(
            password,
            passwordHash.password,
          );

          if (isPasswordValid) {
            userData = {
              status: 200,
              errCode: 0,
              errMessage: 'OK',
              user: user, // Gửi về user mà không có password
              adress: adress,
            };
          } else {
            userData.status = 500;
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
          }
        } else {
          userData.status = 500;
          userData.errCode = 4;
          userData.errMessage = 'Password not found for this user';
        }
      } else {
        userData.status = 501;
        userData.errCode = 2;
        userData.errMessage = 'User not found';
      }

      resolve(userData);
    } catch (e) {
      console.error('Error in handleUserLogin:', e);
      reject(e);
    }
  });
};

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
let editAvatarUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: data.id },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return reject(new Error('User not found'));
      }

      let updatedData = {};
      if (data.image) updatedData.image = data.image; // Giả sử có thuộc tính phone
      // Tiếp tục cho các thuộc tính khác nếu cần

      // Cập nhật chỉ những thuộc tính đã thay đổi
      var dataa = await user.update(updatedData);
      resolve(dataa);
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
  editAvatarUser: editAvatarUser,
};
