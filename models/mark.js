'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mark.belongsTo(models.User,{foreignKey:'studentId',inverse: {
        as: 'studentId',
      }})
      Mark.belongsTo(models.subject,{foreignKey:'subjectId'})

    }
  }
  Mark.init({
    mark: DataTypes.DOUBLE,
    studentId:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    teacherName:{
      type:DataTypes.STRING,
    },
    subjectId:{
      type:DataTypes.INTEGER,
      references:{
        model:'subjects',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    year:{
      type:DataTypes.STRING,
      // get(){
      //   const date= this.getDataValue('year');
      //   return date?date.getFullYear():null;
      // },
      // set(value){
      //   const year=par
      // }
    },
    status:{
      type:DataTypes.ENUM("SUCCESSFUL", "FAILED")
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
    modelName: 'Mark',
  });
  return Mark;
};