'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      group.belongsToMany(models.User,{through:models.group_user})
      group.belongsToMany(models.User,{through:models.message})
    }
  }
  group.init({
    groupName: DataTypes.STRING,
    groupImage:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};