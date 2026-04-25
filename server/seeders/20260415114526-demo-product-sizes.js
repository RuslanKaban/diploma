'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    const sizes = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
    };

    for (let productId = 1; productId <= 83; productId++) {

      // футболки, майки, свитшоты
      if (productId <= 20) {
        data.push(
          { productId, sizeId: sizes.S, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.M, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.L, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.XL, createdAt: new Date(), updatedAt: new Date() }
        );
      }

      // джинсы, брюки
      else if (productId <= 36) {
        data.push(
          { productId, sizeId: sizes.S, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.M, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.L, createdAt: new Date(), updatedAt: new Date() }
        );
      }

      // всё остальное (универсально)
      else {
        data.push(
          { productId, sizeId: sizes.M, createdAt: new Date(), updatedAt: new Date() },
          { productId, sizeId: sizes.L, createdAt: new Date(), updatedAt: new Date() }
        );
      }
    }

    await queryInterface.bulkInsert('ProductSizes', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductSizes', null, {});
  },
};