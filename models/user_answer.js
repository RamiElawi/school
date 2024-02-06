'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class user_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_answer.belongsTo(models.User)
      user_answer.belongsTo(models.answer)
    }
  }
  user_answer.init({
    answerId:{
      type:DataTypes.INTEGER,
      references:{
        model:'answers',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    userId:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    } 
    
  }, {
    sequelize,
    modelName: 'user_answer',
  });
  return user_answer;
};