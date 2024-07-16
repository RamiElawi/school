'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('effectivenesses','image',{type:Sequelize.STRING,allowNull:true})
    await queryInterface.addColumn('referances','description',{type:Sequelize.STRING,allowNull:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('effectivenesses','image')
    await queryInterface.removeColumn('referances','description')
  }
};
