import priceService from '../services/priceService';
let handleGetAllPrice = async (req, res) => {
  let price = await priceService.getAllPrice();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    price: price,
  });
};
module.exports = { handleGetAllPrice: handleGetAllPrice };
