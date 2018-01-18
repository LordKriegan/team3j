'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('News', [{
      news: 'Yugioh shit',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      news: 'Pokemon crap',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      news: 'DragonBall Z stuff',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      news: "Baseball things",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, {});
  }
};
