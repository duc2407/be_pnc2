const adressService = require('../services/adressService'); // Import service

let createAdress = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const { id_user, adress } = req.body;

    // Kiểm tra nếu thiếu thông tin nào đó
    if (!id_user || !adress) {
      return res.status(400).json({
        errCode: 1,
        errMessage: 'Vui lòng cung cấp đầy đủ thông tin!',
      });
    }

    // Gọi hàm createOrders từ service
    let newAdress = await adressService.createAdress({
      id_user: id_user, // Lưu danh sách sản phẩm dưới dạng JSON string
      adress: adress,
    });

    // Trả về response thành công
    return res.status(200).json({
      errCode: 0,
      errMessage: 'Tạo adress Thành công',
      data: newAdress,
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    return res.status(500).json({
      errCode: 2,
      errMessage: 'Có lỗi xảy ra khi tạo adress',
    });
  }
};

module.exports = {
  createAdress,
};
