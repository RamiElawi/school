'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat.belongsTo(models.User,{foreignKey:'senderId'})
      chat.belongsTo(models.User,{foreignKey:'reciverId'})
    }
  }
  chat.init({
    senderId:{type: DataTypes.INTEGER
      ,references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    reciverId:{type: DataTypes.INTEGER,
    references:{
      model:'users',
      key:'id'
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  },
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};