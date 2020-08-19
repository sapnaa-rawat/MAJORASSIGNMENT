var express = require('express');
var router = express.Router();
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
var user1=require('../modules/teacherRegister')
var users1=require('../modules/teacherlogin')
var course=require('../modules/addcourse')

router.post('/signup',user1.signupteacher)
router.post('/login',users1.loginuser)
router.post('/addcourse',course.addCourses)
router.post('/addstudent',course.addNewStudent)


module.exports = router;
