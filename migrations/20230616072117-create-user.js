'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentNumber:{
        type:Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      midelName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      resetToken:{
        type:Sequelize.STRING,
      },
      resetTokenExpiration:{
        type:Sequelize.DATE
      },
      role:{
        type:Sequelize.ENUM("STUDENT","PARENT","TEACHER","ADMIN")
      },
      rate:{
        type:Sequelize.DOUBLE
      },
      sectionId:{
      type:Sequelize.INTEGER,
      references:{
        key:'id',
        model:'sections'
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
    await queryInterface.dropTable('Users');
  }
};