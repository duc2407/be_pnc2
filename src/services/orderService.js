import db from '../models';
let createOrder = async (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(order); // Thêm log để kiểm tra dữ liệu
      let newOrder = await db.Order.create(order);
      resolve(newOrder); // Sửa lại biến trả về
    } catch (error) {
      console.error('Error in createOrder:', error); // In lỗi nếu có
      reject(error);
    }
  });
};

let getAllOrderById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await db.Order.findAll({
        where: { user_id: data.user_id },
      });

      // Lặp qua từng đơn hàng và lấy thông tin sản phẩm cho mỗi đơn
      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          const productIds = order.list_product
            .split(',')
            .map((id) => parseInt(id.trim()));

          // Lấy thông tin các sản phẩm từ bảng Product
          const products = await db.Product.findAll({
            where: {
              id: productIds,
            },
          });

          // Thêm thông tin sản phẩm vào kết quả trả về của đơn hàng
          return {
            ...order.toJSON(),
            products: products,
          };
        }),
      );

      resolve(ordersWithProducts);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrder: createOrder,
  getAllOrderById: getAllOrderById,
};
