'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      group_user.belongsTo(models.User)
      group_user.belongsTo(models.group)
    }
  }
  group_user.init({
    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    groupId: {
      type: DataTypes.INTEGER,
      references:{
        model:'groups',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'group_user',
  });
  return group_user;
};