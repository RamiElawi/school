'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answer.belongsTo(models.question)
      // answer.belongsToMany(models.User,{through:models.user_answer})
      answer.hasMany(models.user_answer)

    }
  }
  answer.init({
    answer:{
      type:DataTypes.STRING
    },
    questionId:{
      type:DataTypes.INTEGER,
      references:{
        model:'questions',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'answer',
  });
  return answer;
};