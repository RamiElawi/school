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
    await queryInterface.removeColumn('Marks','teacherId')
    await queryInterface.addColumn('Marks','teacherName',{
      type:Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Marks','teacherId',{
      type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
    await queryInterface.removeColumn('Marks','teacherName')
  }
};
