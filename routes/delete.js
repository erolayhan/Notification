var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
const db=require('../config/database');
const notify= require('../models/notification');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.delete('/:id',(req,res)=>{
  notify.findOne({where:{id:req.params.id}}).then((foundItem)=>{
    return foundItem.destroy();
  }).
  then(()=>{
      res.send("silindi")
      console.log("bidirim silindi")
    })
  .catch((err)=>{
    res.send(err);
    console.log(err);
  })
})

module.exports = router;
