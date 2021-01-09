const sequelize= require('sequelize');
const db = require('../config/database');
const course= require('./course');

const notification= db.define('notification',{
    title:{
        type: sequelize.STRING
    },
    content:{
        type: sequelize.STRING
    }
})
course.hasMany(notification); // Will add userId to Task model
notification.belongsTo(course);
notification.associate = function(models) {
    notification.belongsTo(models.course, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'courseId',
        allowNull: false
      },
    });
  }

  course.associate = function (models) {
    course.hasMany(models.notification);
  };
  
module.exports= notification;