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
    }
  }
  subject_section.init({
    subject_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject_section',
  });
  return subject_section;
};