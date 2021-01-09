var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const db=require('../config/database');
const notify= require('../models/notification');
const course = require('../models/course');
//const category= require('../models/category');
const jwt= require("jsonwebtoken");
const key= require("../config/key");
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


/* GET users listing. */
router.get('/', function(req, res, next) {
  notify.findAll({ include: [course] })
  .then((notify)=>{
      console.log(notify);
      res.send({
        result:notify
      });
})
  .catch(err=>console.log(err))
});

router.get('/:course_id', function(req, res, next) {
  notify.findAll({where: { courseId: req.params.course_id }, include: [course] })
  .then((notify)=>{
      console.log(notify);
      res.send({
        result:notify
      });
})
  .catch(err=>console.log(err))
});

module.exports = router;
