'use strict';

module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Size.associate = (models) => {
        Size.belongsToMany(models.Product, {
            through: 'ProductSize',
            foreignKey: 'sizeId',
        });
    }
    return Size;
}