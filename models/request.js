'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  request.init({
    status: {
      type: DataTypes.ENUM('acceptable','unacceptable')
    },
    effectivenessId:{
      type:DataTypes.INTEGER,
      references:{
        model:'effectivenesses',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    userId:{
      type:DataTypes.INTEGER,
      references:{
        model:"users",
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};