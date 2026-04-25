'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    const colors = {
      Black: 1,
      White: 2,
      Blue: 3,
      Gray: 4,
    };

    for (let productId = 1; productId <= 83; productId++) {
      data.push(
        { productId, colorId: colors.Black, createdAt: new Date(), updatedAt: new Date() },
        { productId, colorId: colors.White, createdAt: new Date(), updatedAt: new Date() }
      );


      if (productId % 2 === 0) {
        data.push(
          { productId, colorId: colors.Gray, createdAt: new Date(), updatedAt: new Date() }
        );
      }
    }

    await queryInterface.bulkInsert('ProductColors', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductColors', null, {});
  },
};