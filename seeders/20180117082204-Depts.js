'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Depts', [{
      name: 'Yugioh',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      name: 'Pokemon',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      name: 'DragonBall Z',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      name: "Baseball",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Depts', null, {});
  }
};
