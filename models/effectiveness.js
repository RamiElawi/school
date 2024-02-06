'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class effectiveness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      effectiveness.belongsToMany(models.User,{through:models.request})
    }
  }
  effectiveness.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    allowedNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'effectiveness',
  });
  return effectiveness;
};