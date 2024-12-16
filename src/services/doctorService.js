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
let handleManagementLogin = (account, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let managementData = {};
      let management = null;

      // Check if 'account' is email or phone number
      let isEmailExist = await checkEmailSignUp(account);
      let isNumberExist = await checkNumberPhoneSignUp(account);

      if (!isEmailExist) {
        management = await db.Users.findOne({
          where: { email: account },
          include: [{ model: db.Roles, as: 'roleIds' }],
        });
      } else if (!isNumberExist) {
        management = await db.Users.findOne({
          where: { number_phone: account },
          include: [
            { model: db.Roles, as: 'roleIds' }, // Include Cart
          ],
        });
      }

      if (management) {
        let check = await bcrypt.compare(password, management.password);

        if (check) {
          managementData.status = 200;
          managementData.errCode = 0;
          managementData.errMessage = 'OK';

          delete management.password; // Remove password from response
          managementData.management = management;
        } else {
          managementData.status = 500;
          managementData.errCode = 3;
          managementData.errMessage = 'Wrong password';
        }
      } else {
        managementData.status = 501;
        managementData.errCode = 2;
        managementData.errMessage = 'User not found';
      }

      resolve(managementData);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleManagementLogin: handleManagementLogin,
};
