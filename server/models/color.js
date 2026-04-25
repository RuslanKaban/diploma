'use strict';

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Color.associate = (models) => {
    Color.belongsToMany(models.Product, {
      through: 'ProductColor',
      foreignKey: 'colorId',
    });
  };

  return Color;
};