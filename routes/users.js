var express = require('express');
var router = express.Router();

var user=require('../modules/userRegister');
var users=require('../modules/userlogin');
var course=require('../modules/addcourse');

//-------------------------------student----------------------------------------------------

router.post('/signup',user.signupUser)
router.post('/login',users.loginuser)
router.post('/showcourses',course.showCourses)

module.exports = router;



