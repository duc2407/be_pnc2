import db from '../models';
let getAllPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let price = await db.Price.findAll({});
      resolve(price);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { getAllPrice: getAllPrice };
