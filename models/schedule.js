'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schedule.init({
    day: DataTypes.STRING,
    time: DataTypes.DATE,
    subjectId: {
      type:DataTypes.INTEGER,
      references:{
        model:'subjects',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    sectionId: {
      type:DataTypes.INTEGER,
      references:{
        model:'sections',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'schedule',
  });
  return schedule;
};