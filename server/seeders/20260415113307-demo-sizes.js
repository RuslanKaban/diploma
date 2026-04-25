'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      { name: 'XS', createdAt: new Date(), updatedAt: new Date() },
      { name: 'S', createdAt: new Date(), updatedAt: new Date() },
      { name: 'M', createdAt: new Date(), updatedAt: new Date() },
      { name: 'L', createdAt: new Date(), updatedAt: new Date() },
      { name: 'XL', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  },
};