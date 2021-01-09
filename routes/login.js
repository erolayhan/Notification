var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const db=require('../config/database');
const user= require('../models/lecturer');
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
//const category= require('../models/category');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

process.env.SECRET_KEY='secret'

/* GET users listing. */
/*router.get('/',function(req, res, next) {
  user.findAll()
  .then((user)=>{
      console.log(user);
      res.send(user);
})
  .catch(err=>console.log(err))
});
*/
/*********************BURAYA kULLANICI AUTH OLUŞTURMA GELECEK*****************/
router.post('/',(req,res)=>{
  user.findOne({
    where:{
      username: req.body.username
    }
  }).then((user)=>{
    if(bcrypt.compareSync(req.body.password,user.password)){
     let token= jwt.sign(user.dataValues,req.app.get('api_secret_key'),{
       expiresIn:1440
     })
     res.json({
       user,
       token:token
     })
    }
    else res.send("Hatalı şifre veya kullanıcı adı");
  })
  .catch((err)=>{
    res.send(err);
  })
})
/*********************BURAYA ADMİN AUTH OLUŞTURMA GELECEK*****************/

router.post('/admin',(req,res)=>{
  user.findOne({
    where:{
      username: req.body.username
    }
  }).then((user)=>{
    if(user.id==1){
        if(bcrypt.compareSync(req.body.password,user.password)){
          let token= jwt.sign(user.dataValues,req.app.get('api_secret_key'),{
            expiresIn:1440
          })
        res.json({
          user,
          token:token
        })
        }
        else res.send("Hatalı şifre veya kullanıcı adı");
     }
    else res.send("Hatalı kullanıcı adı");
  })
  .catch((err)=>{
    res.send("hatalı kullanıcı adı veya şifre");
  })
})

module.exports = router;
