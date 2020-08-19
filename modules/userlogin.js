var jwt=require('jsonwebtoken');
var Studentmodel = require('../models/student');
var bcrypt = require('bcryptjs');

function loginuser(req,res,next){
    // console.log(req.body)
    
var username=req.body.username;
Studentmodel.find({username:username})
.exec()
.then(user=>{
    if (user.length<1){
res.status(404).json({
    message:"username/password wrong",
});
}else{
    bcrypt.compare(req.body.password,user[0].password, function(err, result,) {
        if(err){
            res.status(404).json({
                message:"username/password wrong",
            });
        }
        if(result){
            
var token=jwt.sign(
    {
        username:user[0].username,
     email:user[0].email

    }, 
    'secretKey',
    {
        expiresIn:"1h"
    } 
    );
            res.status(201).json({
                message:"user found",
                token:token
        });
          }else{
            res.status(404).json({
               message:"username/password wrong",
            });
            
        }
           });
 }
})
   
.catch(err=>{
    res.json({
        error:err
    });
})
};

module.exports={
    loginuser
}