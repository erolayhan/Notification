var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const user= require('../models/lecturer');
const bcrypt= require("bcrypt");

//const category= require('../models/category');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



/*******************BURAYA ADMİN AUTH GELECEK*********************/
router.post('/',(req,res)=>{
  const userData={
    username: req.body.username,
    password: req.body.password
  }

  user.findOne({
    where:{
      username: req.body.username
    }
  }).then((foundItem)=>{
    if(!foundItem){
      const hash= bcrypt.hashSync(userData.password,10)
      userData.password=hash
      user.create(userData)
      .then(()=>{
        res.json({message:"kullanıcı oluşturuldu"});
      })      
      .catch((err)=>res.send(err))
    }
    else res.json({error:"user already exist"});
  })
  .catch((err)=>{
    res.send(err);
  })
})


module.exports = router;
