'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  
  user.prototype.myTasks = function() {
    return this.sequelize.models.task.findAll(
      {where: {userId:  this.id}}
    );
  };
  
  user.prototype.complete = function() {
    return this.sequelize.models.task.findAll(
      {where: {userId:  this.id, due: "NOT NULL"}}
    );
  };
  
  user.prototype.incomplete = function() {
    return this.sequelize.models.task.findAll(
      {where: {userId:  this.id, due: "IS NULL"}}
    );
  };
  
  
  return user;
};