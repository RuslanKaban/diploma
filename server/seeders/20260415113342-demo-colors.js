'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      { name: 'Black', createdAt: new Date(), updatedAt: new Date() },
      { name: 'White', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Blue', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gray', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};