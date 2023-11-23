'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resources_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resources_user.init({
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'resources_user',
  });
  return resources_user;
};