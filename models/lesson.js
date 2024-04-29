'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lesson.belongsToMany(models.User,{through:models.attendance})
      lesson.hasMany(models.file,{foreignKey:'fileableId',constraints:false,scope:{fileableType:'Lesson'}})
      lesson.hasMany(models.question,{foreignKey:'questionableId',constraints:false,scope:{fileableType:'Lesson'}})
    }
  }
  lesson.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
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
          model:'Sections',
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
    modelName: 'lesson',
  });
  return lesson;
};