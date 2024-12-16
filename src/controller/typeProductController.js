import typeProductService from '../services/typeProductService';
let handleGetAllProductbyType = async (req, res) => {
  let product = await typeProductService.getProductsByType();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    product: product,
  });
};
module.exports = { handleGetAllProductbyType: handleGetAllProductbyType };
