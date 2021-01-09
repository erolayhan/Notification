const Sequelize = require('sequelize');

module.exports = new Sequelize('notification', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql' ,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    }, 
    timezone:'+03:00'
  });