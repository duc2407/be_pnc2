import db from '../models';
let createPayment = (data) => {
  return new Promise(async (resolve, reject) => {
    let newPayment = await db.Payments.create(data);
    resolve(newPayment);
  });
};

let getPaymentById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payment = await db.Payments.findAll({
        where: { id: id },
        attributes: { exclude: ['code_pin'] },
      });
      resolve(payment);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createPayment: createPayment,
  getPaymentById: getPaymentById,
};
