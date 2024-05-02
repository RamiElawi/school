'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subject.belongsToMany(models.User,{through:models.Mark})
      subject.belongsToMany(models.Section,{through:models.schedules})
      subject.hasMany(models.question,{foreignKey:'questionableId',constraints:false,scope:{fileableType:'Subject'}})
      subject.belongsTo(models.User,{foreignKey:"teacherId"})
      subject.belongsTo(models.Class)
    }
  }
  subject.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    minimumSuccess:DataTypes.DOUBLE,
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    teacherId:{
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    ClassId:{
      type:DataTypes.INTEGER,
      references:{
        model:'classes',
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
    modelName: 'subject',
  });
  return subject;
};