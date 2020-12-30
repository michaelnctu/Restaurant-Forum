'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      [{ '中式料理': 'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1358&q=80' }
        , { '日本料理': 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80' }
        , { '義大利料理': 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1321&q=80' }
        , {
        '墨西哥料理': 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
      }, { '素食料理': 'https://images.unsplash.com/photo-1602016753527-3b369b88af5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }, { '美式料理': 'https://images.unsplash.com/photo-1586540480250-e3a0717298b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }, { '越南料理': 'https://unsplash.com/photos/08aic3qPcag' }]
        .map((item, index) =>
        ({
          id: index + 1,
          name: Object.keys(item),
          image: Object.values(item),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
