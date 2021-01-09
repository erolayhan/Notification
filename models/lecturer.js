const sequelize= require('sequelize');
const db = require('../config/database');

const lecturer= db.define('lecturer',{
    username:{
        type: sequelize.STRING
    },
    password:{
        type: sequelize.STRING
    }
})

module.exports= lecturer;