import paymentService from '../services/paymentService';
let postCreatePayment = async (req, res) => {
  let payment = {
    id: req.body.id,
    remainder: 0,
    code_account: req.body.code_account,
    number_phone: req.body.number_phone,
    code_pin: req.body.code_pin,
  };
  try {
    await paymentService.createPayment(payment);
    res.status(200).json({ status: 200, message: 'OKE' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

let postPaymentById = async (req, res) => {
  let id = req.body.id;

  try {
    let response = await paymentService.getPaymentById(id);
    res.status(200).json({ status: 200, message: 'OKE', data: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
module.exports = {
  postCreatePayment: postCreatePayment,
  postPaymentById: postPaymentById,
};
