'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.token)
      User.belongsTo(models.Section)
      User.belongsToMany(models.lesson,{through:models.attendance})
      User.belongsToMany(models.effectiveness,{through:models.request})
      User.hasMany(models.referance,{foreignKey:"teacherId"})
      User.belongsToMany(models.subject,{through:models.Mark,foreignKey:"studentId"})
      // User.hasMany(models.Mark,{foreignKey:"teacherId"})
      User.hasMany(models.Mark,{foreignKey:"studentId"})
      User.hasMany(models.rate,{foreignKey:'userId1'})
      User.hasMany(models.rate,{foreignKey:'userId2'})
      // User.hasMany(models.chat,{foreignKey:'senderId'})
      // User.hasMany(models.chat,{foreignKey:'reciverId'})
      User.hasMany(models.father,{foreignKey:'fatherId'})
      User.hasMany(models.father,{foreignKey:'studentId'})
      // User.hasMany(models.schedules,{foreignKey:'teacherId'})
      // User.belongsToMany(models.answers,{through:models.user_answer})
      User.hasMany(models.user_answer)
      User.hasMany(models.subject,{foreignKey:'teacherId'})
      User.belongsToMany(models.group,{through:models.group_user})
      User.belongsToMany(models.group,{through:models.message})
      
    }
  }
  User.init({
    id:{
      allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    studentNumber:DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    midelName: DataTypes.STRING,
    motherName:DataTypes.STRING,
    address:DataTypes.STRING,
    Date:DataTypes.STRING,
    phone:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpiration: DataTypes.DATE,
    role:DataTypes.ENUM("STUDENT","PARENT","TEACHER","ADMIN"),
    rate: DataTypes.DOUBLE,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    SectionId:{
      type:DataTypes.INTEGER,
      references:{
        model:'sections',
        key:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
    loginToken:{type:DataTypes.STRING,allowNull:true},
    status:{type:DataTypes.ENUM('accepted','unaccepted'),allowNull:true}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};