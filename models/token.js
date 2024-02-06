'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      token.belongsTo(models.User)

    }
  }
  token.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING
    },
    userId:{
      type:DataTypes.INTEGER,
      references:{
        key:'id',
        model:'users'
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
    modelName: 'token',
    userId:{
      type:DataTypes.INTEGER,
      referances:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    }
  });

  return token;
};