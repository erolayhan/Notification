const express= require('express');
const bodyParser= require('body-parser');
const path= require('path');
const db= require('./config/database');
const key=require('./config/key');
const app= express();
const verify= require('./middleware/verify'); //lecturer token oluşturur
const adminverify= require('./middleware/adminverify');

app.set('api_secret_key',key.api_secret_key);
app.set('api_secret_key2',key.api_secret_key2);

app.use('/test', require('./routes/test'));
app.use('/login', require('./routes/login'));   //token ile birlikte lecturer girişi sağlar
app.use('/course', require('./routes/course')); //dersleri görme 
app.use('/notify', require('./routes/notification'));   //notları görme derse göre not görme

app.use('/delete',verify, require('./routes/delete'));     //notları silme lecturer token ile
app.use('/lecturer', verify, require('./routes/lecturer'));//not ekleme ve kişiye göre dersleri görme token ile
app.use('/register', adminverify, require('./routes/register'));     //kullanıcı kayıt admin token ile
app.use('/admin',adminverify,require('./routes/admin'));//admin işlemleri admin token ile

db.authenticate()
    .then(()=>console.log("database connected"))
    .catch(err=>console.log("Error"+err))
app.get('/',(req,res)=>{
    res.send('hello world');

});

const PORT= process.env.PORT||3000;



app.listen(PORT, console.log('Server started on port'+ PORT));
