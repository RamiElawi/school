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
      schedule.belongsTo(models.Section)
      schedule.belongsTo(models.subject)
      schedule.belongsTo(models.User,{foreignKey:'teacherId'})
    }
  }
  schedule.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hour:DataTypes.TIME,
    day:DataTypes.ENUM("SAT","SUN","MON","TUS","WEN","THS"),
    date:DataTypes.DATE,
    subjectId:{
      type:DataTypes.INTEGER,
      references:{
        model:'subjects',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    SectionId:{
      type:DataTypes.INTEGER,
      references:{
        model:'sections',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'},
    teacherId:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
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
    modelName: 'schedules',
  });
  return schedule;
};