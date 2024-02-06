'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.User)
      message.belongsTo(models.group_user)
    }
  }
  message.init({
    text: DataTypes.STRING,
    date: DataTypes.DATE,
    group_userId: {
      type: DataTypes.INTEGER,
      references:{
        model:'group_users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};