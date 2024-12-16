const orderService = require('../services/orderService'); // Import service

let createOrder = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const {
      user_id,
      list_product,
      adress,
      price,
      number_phone,
      name_user,
      status,
    } = req.body;

    // Kiểm tra nếu thiếu thông tin nào đó
    if (
      !user_id ||
      !list_product ||
      !adress ||
      !price ||
      !number_phone ||
      !name_user ||
      !status
    ) {
      return res.status(400).json({
        errCode: 1,
        errMessage: 'Vui lòng cung cấp đầy đủ thông tin!',
      });
    }

    // Gọi hàm createOrders từ service
    let newOrder = await orderService.createOrder({
      user_id: user_id,
      list_product: list_product, // Lưu danh sách sản phẩm dưới dạng JSON string
      adress: adress,
      price: price,
      number_phone: number_phone,
      name_user: name_user,
      status: status,
    });

    // Trả về response thành công
    return res.status(200).json({
      errCode: 0,
      errMessage: 'Đơn hàng đã được tạo thành công',
      data: newOrder,
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    return res.status(500).json({
      errCode: 2,
      errMessage: 'Có lỗi xảy ra khi tạo đơn hàng',
    });
  }
};

let getAllOrdersByUserId = async (req, res) => {
  try {
    // Lấy user_id từ request (trong trường hợp này là từ query hoặc params)
    const userId = req.body.user_id || req.params.user_id;

    if (!userId) {
      return res.status(400).json({
        errCode: 1,
        errMessage: 'Thiếu user_id',
      });
    }

    let orders = await orderService.getAllOrderById({ user_id: userId });

    if (orders.length > 0) {
      return res.status(200).json({
        errCode: 0,
        errMessage: 'Lấy đơn hàng thành công',
        data: orders,
      });
    } else {
      return res.status(200).json({
        errCode: 2,
        errMessage: 'Không có đơn hàng nào cho user này',
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      errMessage: 'Đã xảy ra lỗi khi lấy đơn hàng',
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUserId,
};
