'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Restaurants', 'CategoryId', {  // Sequelize 的設計統一讓外鍵的首字大寫。
      type: Sequelize.INTEGER,
      allowNull: false,
      refernce: {
        model: 'Categories',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Restaurants', 'CategoryId')
  }
};
