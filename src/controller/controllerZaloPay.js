const zaloPaymentService = require('../services/zaloPayService');

// Controller để tạo thanh toán ZaloPay
async function createPayment(req, res) {
  try {
    // Lấy amount và redirecturl từ request body
    const { amount, redirecturl } = req.body;

    // Kiểm tra số tiền hợp lệ
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Số tiền không hợp lệ' });
    }

    // Kiểm tra redirecturl có tồn tại và hợp lệ
    if (!redirecturl || typeof redirecturl !== 'string') {
      return res.status(400).json({ message: 'Redirect URL không hợp lệ' });
    }

    // Tạo URL thanh toán từ service, truyền amount và redirecturl vào
    const paymentUrl = await zaloPaymentService.createZaloPayPayment(
      amount,
      redirecturl,
    );

    // Trả về URL thanh toán cho client
    return res.json({ paymentUrl });
  } catch (error) {
    console.error('Lỗi khi tạo thanh toán ZaloPay:', error.message);
    return res
      .status(500)
      .json({ message: 'Lỗi khi tạo thanh toán', error: error.message });
  }
}

// Controller để xử lý kết quả thanh toán (callback từ ZaloPay)
async function handlePaymentNotification(req, res) {
  try {
    const paymentResult = req.body; // Dữ liệu trả về từ ZaloPay
    console.log('Thanh toán kết quả:', paymentResult);

    // Xử lý kết quả thanh toán (cập nhật trạng thái đơn hàng...)

    // Trả về xác nhận
    res.status(200).send('OK');
  } catch (error) {
    console.error('Lỗi khi xử lý kết quả thanh toán:', error);
    res.status(500).send('Lỗi khi xử lý kết quả thanh toán');
  }
}

module.exports = {
  createPayment,
  handlePaymentNotification,
};
