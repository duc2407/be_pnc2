const CryptoJS = require('crypto-js');
const axios = require('axios').default;
const moment = require('moment');
// Thông tin cần thiết

// Hàm tạo mã mac

// Hàm tạo URL thanh toán ZaloPay
async function createZaloPayPayment(amount, redirecturl) {
  const config = {
    app_id: '2554',
    key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };

  // Sử dụng redirecturl nhận từ frontend
  const embed_data = { redirecturl: redirecturl };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: 'user123',
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount, // Sử dụng giá trị amount từ frontend
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: '',
  };

  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });

    if (result.data && result.data.order_url) {
      return result.data.order_url; // Trả về order_url từ phản hồi ZaloPay
    } else {
      console.error('Không nhận được order_url từ ZaloPay:', result.data);
      throw new Error('Không thể tạo thanh toán ZaloPay');
    }
  } catch (error) {
    console.error(
      'Lỗi khi gọi ZaloPay API:',
      error.response ? error.response.data : error.message,
    );
    throw new Error(
      'Lỗi khi tạo thanh toán: ' +
        (error.response ? error.response.data : error.message),
    );
  }
}

// Hàm gọi API ZaloPay (nếu cần gửi yêu cầu trực tiếp)
async function initiateZaloPayPayment(paymentUrl) {
  try {
    const response = await axios.post(paymentUrl);
    return response.data;
  } catch (error) {
    throw new Error('Lỗi trong quá trình thanh toán ZaloPay: ' + error.message);
  }
}

module.exports = {
  createZaloPayPayment,
  initiateZaloPayPayment,
};
