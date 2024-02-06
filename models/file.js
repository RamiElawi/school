'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      file.belongsTo(models.User,{foreignKey:'fileabelId',constraints:false})
      file.belongsTo(models.lesson,{foreignKey:'fileabelId',constraints:false})
    }
  }
  file.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  path:{
    type:DataTypes.STRING
  },
  name:{
    type:DataTypes.STRING
  },
  fileableId:{
      type:DataTypes.INTEGER,
      allowNull:false
  },
  fileableType:{
      type:DataTypes.ENUM('Personal','Lesson'),
      allowNull:false
  },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};