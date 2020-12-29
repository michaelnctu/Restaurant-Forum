'use strict';
const faker = require('faker') //因為餐廳眾多 我想用faker假資料產生多筆 然後放入資料庫

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 }).map(d =>
      ({
        name: faker.company.companyName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        opening_hours: '08:00',
        image: `https://loremflickr.com/640/480/restaurant,food/?random=${Math.random() * 100}`,
        description: faker.lorem.text(),
        createdAt: new Date(),
        updatedAt: new Date(),
        CategoryId: Math.floor(Math.random() * 5) + 1,
        longitude: faker.address.longitude(),
        latitude: faker.address.longitude(),
      })
      ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
