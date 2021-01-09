var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const user= require('../models/lecturer');
const bcrypt= require("bcrypt");
const course=require('../models/course');
const lecturer=require('../models/lecturer');

//const category= require('../models/category');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



/*******************BURAYA ADMİN AUTH GELECEK*********************/
router.get('/lecturer', function(req, res, next) {
    lecturer.findAll()
    .then((lecturer)=>{
        console.log(lecturer);
        res.send({result:lecturer});
  })
    .catch(err=>console.log(err))
  });

  router.get('/lecturer/:lecturer_id', function(req,res,next){
    course.findAll({ where: { lecturerId: req.params.lecturer_id } })
    .then((course)=>{
      console.log(course);
      res.send({result:course});
    })
      .catch(err=>console.log(err));
    });

    router.post('/newcourse', (req, res) => { //
        course.create(req.body)
            .then(course => res.json(course))
            .catch(err=>res.send(err));
      })

      router.delete('/deletecourse/id',(req,res)=>{
        notify.findAll({where:{courseId:req.params.id}}).then((foundnotify)=>{
          return foundnotify.destroy();
        }).
        then(()=>{
                course.findOne({where:{id:req.params.id}}).then((foundCourse)=>{
                  return foundCourse.destroy();
                }).
                then(()=>{
                    res.send("Kullanıcı silindi")
                  })
                .catch((err)=>{
                  res.send(err);
                  console.log(err);
                })
          })
        .catch((err)=>{
          res.send(err);
          console.log(err);
        })
      })

      
module.exports = router;
