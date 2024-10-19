import db from '../models';
let getAllTypeProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeProduct = await db.TypeProduct.findAll({});
      resolve(typeProduct);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { getAllTypeProduct: getAllTypeProduct };
