'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Marks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mark: {
        type: Sequelize.DOUBLE
      },
      year:{
        type:Sequelize.DATE
      },
      status:{
        type:Sequelize.ENUM("SUCCESSFUL", "FAILED")
      },
      studentId:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      teacherId:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      }
      ,subjectId:{
        type:Sequelize.INTEGER,
        references:{
          model:'subjects',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Marks');
  }
};