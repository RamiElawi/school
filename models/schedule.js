'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject_section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subject_section.belongsTo(models.Section)
      subject_section.belongsTo(models.subject)
      subject_section.belongsTo(models.User,{foreignKey:'teacherId'})
    }
  }
  subject_section.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hour:DataTypes.DATE,
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
    sectionId:{
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
  return subject_section;
};