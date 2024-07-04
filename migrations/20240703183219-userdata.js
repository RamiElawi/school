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
    await queryInterface.addColumn('users','motherName',{type:Sequelize.STRING}) 
    await queryInterface.addColumn('users','phone',{type:Sequelize.STRING})
    await queryInterface.addColumn('users','address',{type:Sequelize.STRING})
    await queryInterface.addColumn('users','Date',{type:Sequelize.STRING})
    await queryInterface.addColumn('users', 'loginToken',{type:Sequelize.STRING,allowNull:true})
    await queryInterface.addColumn('users','status',{type:Sequelize.ENUM('accepted','unaccepted'),allowNull:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users','motherName')
    await queryInterface.removeColumn('users','phone')
    await queryInterface.removeColumn('users','address')
    await queryInterface.removeColumn('users','Date')
    await queryInterface.removeColumn('users','loginToken')
    await queryInterface.removeColumn('users','status')
  }
};
