var express = require('express');
var router = express.Router();
const db=require('../config/database');
const course= require('../models/course');
const notify= require('../models/notification');
//const category= require('../models/category');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({
        'id':1
    })
});



module.exports = router;
