'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class referance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      referance.belongsTo(models.User,{foreignKey:'teacherId'})
    }
  }
  referance.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    image:DataTypes.STRING,
    type:{type:DataTypes.STRING},
    teacherId:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
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
    modelName: 'referance',
  });
  return referance;
};