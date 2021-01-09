const sequelize= require('sequelize');
const db = require('../config/database');
const lecturer= require('./lecturer');

const course= db.define('course',{
    code:{
        type: sequelize.STRING
    },
    name:{
        type: sequelize.STRING
    }
})
lecturer.hasMany(course); // Will add userId to Task model
course.belongsTo(lecturer);

module.exports= course;