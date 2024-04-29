'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('acceptable','unacceptable')
      },
      effectivenessId:{
        type:Sequelize.INTEGER,
        references:{
          model:'effectivenesses',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      UserId:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      weight:{
        type:Sequelize.DOUBLE
      },
      lenght:{
        type:Sequelize.DOUBLE
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
    await queryInterface.dropTable('requests');
  }
};