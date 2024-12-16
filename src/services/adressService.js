import db from '../models';
let createAdress = async (adress) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(adress); // Thêm log để kiểm tra dữ liệu
      let newAdess = await db.Adress.create(adress);
      resolve(newAdess); // Sửa lại biến trả về
    } catch (error) {
      console.error('Error in createOrder:', error); // In lỗi nếu có
      reject(error);
    }
  });
};
module.exports = {
  createAdress: createAdress,
};
