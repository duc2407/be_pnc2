import db from '../models';
let getProductsByType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const types = await db.TypeProduct.findAll();

      // Join thủ công với bảng Product
      const products = await db.Product.findAll();
      console.log(products.length);
      // Tổ chức dữ liệu theo loại sản phẩm
      const response = types.map((type) => {
        const filteredProducts = products.filter(
          (product) => product.id_type === type.id,
        );
        return {
          id: type.id,
          name: type.name,
          products: filteredProducts, // Chỉ các sản phẩm có type_id tương ứng
        };
      });

      resolve(response);
    } catch (error) {
      console.error('Error getting products by type:', error);
      reject(error);
    }
  });
};

module.exports = { getProductsByType: getProductsByType };
