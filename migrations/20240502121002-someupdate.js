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
    await queryInterface.removeColumn('schedules','teacherId')
    await queryInterface.addColumn('subjects','ClassId',{
      type:Sequelize.INTEGER,
      references:{
        model:'classes',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('schedules','teacherId',{
      type:Sequelize.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })
    await queryInterface.removeColumn('subjects','ClassId')
  }
};
