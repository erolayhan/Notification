var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const notify= require('../models/notification');
const course= require('../models/course');

//const category= require('../models/category');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post('/', (req, res) => { //post işlemi için courseId, content ve title verileri gerekiyor
  const userData={
    courseId: req.body.courseId,
    title: req.body.title,
    content:req.body.content
  }
  notify.create(req.body)
      .then(notify => res.json(notify))
      .catch(err=>res.send(err));
})

//kişi idsine göre ders görme 
router.get('/:lecturer_id', function(req,res,next){
    course.findAll({ where: { lecturerId: req.params.lecturer_id } })
    .then((course)=>{
      console.log(course);
      res.send({result:course});
    })
      .catch(err=>console.log(err));
    });


module.exports = router;
