'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hour:Sequelize.DATE,
      day:Sequelize.ENUM("SAT","SUN","MON","TUS","WEN","THS"),
      date:Sequelize.DATE,
      subjectId:{
        type:Sequelize.INTEGER,
        references:{
          model:'subjects',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      sectionId:{
        type:Sequelize.INTEGER,
        references:{
          model:'sections',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'},
      teacherId:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
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
    await queryInterface.dropTable('schedules');
  }
};