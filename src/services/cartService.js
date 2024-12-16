import db from '../models';

let checkCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let aboutCart = await db.Cart.findOne({ where: { id: id } });

      if (aboutCart) {
        let detailCart = await db.DetailCart.findAll({
          where: { id_cart: id },
        });

        let products = [];
        for (let item of detailCart) {
          let product = await db.Product.findOne({
            where: { id: item.id_product },
          });
          if (product) {
            products.push({
              ...item.dataValues,
              product,
            });
          }
        }

        resolve({ aboutCart, detailCart: products });
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createCartUser = (cart) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newCart = await db.Cart.create({ id: cart.id, detail_cart: cart.id });

      let newDetailCart = await db.DetailCart.create({
        id_cart: cart.id,
      });

      let product = await db.Product.findOne({
        where: { id: newDetailCart.id_product },
      });
      resolve({
        newCart,
        newDetailCart: { ...newDetailCart.dataValues, product },
      });
    } catch (error) {
      reject(error); // Xử lý lỗi nếu có
    }
  });
};
let updateIdCartUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm người dùng dựa trên id
      let user = await db.Users.findOne({
        where: { id: data.id },
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return reject(new Error('User not found'));
      }

      let updatedData = {};

      if (data.id_cart) {
        updatedData.id_cart = data.id;
      }

      const updatedUser = await user.update(updatedData);

      resolve(updatedUser);
    } catch (error) {
      reject(error);
    }
  });
};
let addProductOnCartUser = (detailCart) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      let existingCartItem = await db.DetailCart.findOne({
        where: {
          id_cart: detailCart.id_cart,
          id_product: detailCart.id_product,
        },
      });

      if (existingCartItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        existingCartItem.quantity += detailCart.quantity;
        await existingCartItem.save();

        // Lấy thông tin sản phẩm
        let product = await db.Product.findOne({
          where: { id: detailCart.id_product },
        });

        resolve({
          updatedCart: existingCartItem,
          newDetailCart: { ...existingCartItem.dataValues, product },
        });
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới
        let newCart = await db.DetailCart.create({
          id_cart: detailCart.id_cart,
          id_product: detailCart.id_product,
          quantity: detailCart.quantity,
        });

        // Lấy thông tin sản phẩm
        let product = await db.Product.findOne({
          where: { id: detailCart.id_product },
        });

        resolve({
          newCart,
          newDetailCart: { ...newCart.dataValues, product },
        });
      }
    } catch (error) {
      reject(error); // Xử lý lỗi nếu có
    }
  });
};

let deleteProductOnCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm sản phẩm trong giỏ hàng
      let product = await db.DetailCart.findOne({
        where: { id_cart: data.id_cart, id_product: data.id_product },
      });

      // Kiểm tra nếu không tìm thấy sản phẩm
      if (!product) {
        return reject('Không tìm thấy sản phẩm trong giỏ hàng');
      }

      // Xóa sản phẩm
      await product.destroy();
      resolve('Xóa thành công');
    } catch (e) {
      reject(e);
    }
  });
};
let updateQuatityOnCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm sản phẩm trong giỏ hàng dựa trên id
      let product = await db.DetailCart.findOne({
        where: { id: data.id },
      });

      // Kiểm tra xem sản phẩm có tồn tại không
      if (!product) {
        return reject(new Error('Sản phẩm không tồn tại trong giỏ hàng'));
      }

      // Cập nhật số lượng
      product.quantity = data.quatity; // Trực tiếp cập nhật thuộc tính quantity
      await product.save(); // Lưu thay đổi

      resolve(product); // Trả về sản phẩm đã được cập nhật
    } catch (error) {
      reject(error); // Trả về lỗi nếu có
    }
  });
};

module.exports = {
  createCartUser,
  checkCart,
  updateIdCartUser: updateIdCartUser,
  addProductOnCartUser: addProductOnCartUser,
  deleteProductOnCart: deleteProductOnCart,
  updateQuatityOnCart: updateQuatityOnCart,
};
