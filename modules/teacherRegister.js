var teachers = require('../models/teacher');
//var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
var Students = require("../models/student");
var mail = require("./mailer");
function generatePassword() {
  var length = 6,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
//SignUp user
function signupUser(req, res, next) {
  console.log(req.body);
  var username = req.body.username;
  var email = req.body.email;
  var password = generatePassword();
  console.log(password);

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      res.json({
        message: "something is wrong",
        error: err,
      });
    } else {
      console.log(hash);
      mail.sendingMail(email, password);
      var data = new Students({
        username: username,
        email: email,
        password: hash,
      });
      data
        .save()
        .then((doc) => {
          res.status(200).json({
            message: "user registerd successfully",
            results: doc,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
}


//SignUp Teacher
function signupteacher(req, res, next) {
console.log(req.body)
var username=req.body.username;
var email =req.body. email;
var password=req.body. password;
var  confirmPassword=req.body.confirmPassword;
    if(password!==confirmPassword){
        return res.json({
            message:"Incorrect password",
          
        });
    }
else{   
     bcrypt.hash(password, 10,function(err,hash){
         if (err){
            res.json({
                message:"something is wrong",
                error:err
           });
         }else{ 
            console.log(hash); 
            var data=new teachers({
            username:username,
            email:email,
            password:hash,
        });
        data.save()
        .then(doc=>{
            res.status(200).json({
                message:"user registerd successfully",
                results:doc
            });
              })
        .catch(err=>{
            res.json(err);
        });
            
         }
     });

   
}
   
 
 };


module.exports = {

    signupteacher,
   signupUser
};
