module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: DataTypes.INTEGER, // Sử dụng INTEGER vì giá trị là số nguyên
        allowNull: false,
      },
    },
    {
      tableName: 'prices', // Tên bảng trong cơ sở dữ liệu
      timestamps: false, // Không sử dụng timestamps (createdAt, updatedAt)
    },
  );

  return Price;
};
