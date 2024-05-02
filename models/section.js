'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.belongsTo(models.Class)
      Section.belongsToMany(models.subject,{through:models.schedules})
      Section.hasMany(models.User)
      Section.hasMany(models.lesson)
    }
  }
  Section.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sectionNumber: DataTypes.STRING,
    maxNumberOfStudent:DataTypes.INTEGER,
    ClassId:{
      type:DataTypes.INTEGER,
      references:{
        model:'classes',
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
    modelName: 'Section',
  });
  return Section;
};