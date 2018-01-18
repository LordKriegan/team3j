'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Items', [{
        itemName: 'Some Yugi Card',
        itemPrice: 2.4,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 1
      }, {
        itemName: 'Some Other Yugi Card',
        itemPrice: 4.2,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 1
      }, {
        itemName: 'Some Poke Card',
        itemPrice: 2.4,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 2
      },{
        itemName: 'Some Other Poke Card',
        itemPrice: 4.2,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 2
      }, {
        itemName: 'Some DBZ Card',
        itemPrice: 2.4,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 3
      },{
        itemName: 'Some Other DBZ Card',
        itemPrice: 4.2,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 3
      }, {
        itemName: 'Some Baseball Card',
        itemPrice: 2.4,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 4
      }, {
        itemName: 'Some Other Baseball Card',
        itemPrice: 4.2,
        createdAt : new Date(),
        updatedAt : new Date(),
        DeptId : 4
      },], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
