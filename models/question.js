'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     question.hasMany(models.answer)
     question.belongsTo(models.lesson,{foreignKey:'questionableId',constraints:false})
     question.belongsTo(models.subject,{foreignKey:'questionableId',constraints:false})
    }
  }
  question.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    rightAnswer: DataTypes.INTEGER,
    mark:DataTypes.DOUBLE,
    questionableId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    questionableType:{
      type:DataTypes.ENUM("Lesson","Subjects"),
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};