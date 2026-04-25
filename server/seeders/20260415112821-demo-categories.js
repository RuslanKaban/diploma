'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Футболки', slug: 'tshirts', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Майки', slug: 'tanktops', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Куртки', slug: 'jackets', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Свитшоты', slug: 'sweatshirts', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Джинсы', slug: 'jeans', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Шорты', slug: 'shorts', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Брюки', slug: 'pants', gender: 'men', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Обувь', slug: 'shoes', gender: 'men', createdAt: new Date(), updatedAt: new Date() },

      { name: 'Футболки', slug: 'tshirts', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Топы', slug: 'tops', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Куртки', slug: 'jackets', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Свитшоты', slug: 'sweatshirts', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Джинсы', slug: 'jeans', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Юбки', slug: 'skirts', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Брюки', slug: 'pants', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Обувь', slug: 'shoes', gender: 'women', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};