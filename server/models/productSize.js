'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  ProductSize.associate = (models) => {
    ProductSize.belongsTo(models.Product, {
      foreignKey: 'productId',
    });

    ProductSize.belongsTo(models.Size, {
      foreignKey: 'sizeId',
    });
  };

  return ProductSize;
};