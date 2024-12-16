import cartService from '../services/cartService';

let postCreateCart = async (req, res) => {
  let cart = {
    id: req.body.id,
  };

  try {
    // Kiểm tra xem giỏ hàng có tồn tại hay không
    let cartVailable = await cartService.checkCart(cart.id);

    // Nếu giỏ hàng chưa tồn tại, tạo mới
    if (!cartVailable) {
      let { newCart, newDetailCart } = await cartService.createCartUser(cart);
      res.status(200).json({
        status: 200,
        message: 'Đăng kí thành công.',
        cart: newCart,
        detailCart: newDetailCart,
      });
    } else {
      return res.status(201).json({
        status: 200,
        message: 'Đã có cart.',
        cart: cartVailable,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
let postAddProductOnCart = async (req, res) => {
  let detailProuct = {
    id_cart: req.body.id_cart,
    id_product: req.body.id_product,
    quantity: req.body.quantity,
  };

  try {
    await cartService.addProductOnCartUser(detailProuct);
    res.status(200).json({
      status: 200,
      message: 'add thành công',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
const deleteProductOnCart = async (req, res) => {
  try {
    // Lấy id_product từ request body
    let data = { id_cart: req.body.id_cart, id_product: req.body.id_product };
    // Gọi service để xóa sản phẩm khỏi giỏ hàng
    let message = await cartService.deleteProductOnCart(data);

    // Trả về response thành công
    return res
      .status(200)
      .json({ status: 200, message: 'Xóa sản phẩm thành công', data: message });
  } catch (error) {
    // Xử lý lỗi nếu có
    return res.status(500).json({ error: error.message });
  }
};
const updateQuantityInCart = async (req, res) => {
  try {
    // Lấy id và quantity từ request body
    const { id, quatity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || quatity === undefined) {
      return res.status(400).json({
        message: 'Thiếu id hoặc quantity',
      });
    }

    // Gọi service để cập nhật số lượng sản phẩm trong giỏ hàng
    const updatedProduct = await cartService.updateQuatityOnCart({
      id,
      quatity,
    });

    // Trả về phản hồi thành công
    return res.status(200).json({
      message: 'Cập nhật số lượng sản phẩm thành công',
      product: updatedProduct,
    });
  } catch (error) {
    // Xử lý lỗi
    return res.status(500).json({
      message: 'Cập nhật số lượng sản phẩm thất bại',
      error: error.message,
    });
  }
};
module.exports = {
  postCreateCart,
  postAddProductOnCart: postAddProductOnCart,
  deleteProductOnCart: deleteProductOnCart,
  updateQuantityInCart: updateQuantityInCart,
};
