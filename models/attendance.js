'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attendance.belongsTo(models.User)
    }
  }
  attendance.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM("na","a")
    },
    lessonId:{
      type:DataTypes.INTEGER,
      references:{
        model:'lessons',
        key:'id'
      },
      onDelete:'CASACDE',
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
    modelName: 'attendance',
  });
  return attendance;
};