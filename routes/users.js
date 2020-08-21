var express = require('express');
var router = express.Router();

//var user=require('../modules/userRegister');
var users=require('../modules/userlogin');
var course=require('../modules/addcourse');
var jwt=require('jsonwebtoken');


function authToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
  
      var decode = jwt.verify(token,'secretKey');
      console.log(decode._doc);
      next();
    } catch (err) {
      res.status(401).send("invalid token");
    }
  }



router.get('/download', function (req, res, next) {
    var filePath = "http://localhost:3000/public/uploads/report.pdf"; 
    var fileName = "report.pdf"; // The default name the browser will use

    res.download(filePath, fileName);    
});




//-------------------------------student----------------------------------------------------


router.post('/login',users.loginuser)
router.post('/showcourses',authToken,course.showCourses)
router.get('/testscore/:id',authToken,course.checkTest)
module.exports = router;







    