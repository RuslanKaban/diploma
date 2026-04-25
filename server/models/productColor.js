'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define('ProductColor', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    ProductColor.associate = (models) => {
        ProductColor.belongsTo(models.Product,{
            foreignKey: 'productId',
        });
        ProductColor.belongsTo(models.Color,{
            foreignKey: 'colorId',
        })
    }
    return ProductColor;
}