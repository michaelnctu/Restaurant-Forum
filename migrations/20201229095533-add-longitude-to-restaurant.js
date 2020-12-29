'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: true,

    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'longitude')

  }
};
