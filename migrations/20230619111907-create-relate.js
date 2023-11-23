'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    return queryInterface.addColumn('users','classId', {
      type:Sequelize.INTEGER,
      references:{
        model:'classes',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
     })
     .then(()=>{
      return queryInterface.addColumn('tokens','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
     })
     .then(()=>{
        return queryInterface.addColumn('Marks','userId',{
          type:Sequelize.INTEGER,
          references:{
            model:'users',
            key:'id'
          },
          onDelete:'CASCADE',
          onUpdate:'CASCADE'
        })
     })
     .then(()=>{
      return queryInterface.addColumn('Marks','subjectId',{
        type:Sequelize.INTEGER,
        references:{
          model:'subjects',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
     })
     .then(()=>{
      return queryInterface.addColumn('referances','subjectId',{
        type:Sequelize.INTEGER,
        references:{
          model:'subjects',
          key:'id'
        },
        onDelete:'CASCADE',
        onUPdate:'CASCADE'
      })
     })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('users','classId')
    .then(()=>{
      return queryInterface.removeColumn('tokens','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('Marks','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('Marks','subjectId')
    })
    .then(()=>{
      return queryInterface.removeColumn('referances','subjectId')
    })
  }
};
