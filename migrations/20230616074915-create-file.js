'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    path:{
      type:Sequelize.STRING
    },
    name:{
      type:Sequelize.STRING
    },
    fileableId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    fileableType:{
        type:Sequelize.ENUM('Personal','Lesson'),
        allowNull:false
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
    await queryInterface.dropTable('files');
  }
};