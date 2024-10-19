'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prices', [
      { id: 1, price: 100000 },
      { id: 2, price: 500000 },
      { id: 3, price: 1000000 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prices', null, {});
  },
};
