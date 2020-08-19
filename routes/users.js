var express = require('express');
var router = express.Router();

var user=require('../modules/userRegister');
var users=require('../modules/userlogin');
var course=require('../modules/addcourse.js');


/*
router.get('/download', function (req, res, next) {
    var filePath = "C:\Users\shree\Desktop\nodejsss\MAJORASSIGNMENT\myapp\public\download"; 
    var fileName = "report.pdf"; // The default name the browser will use

    res.download(filePath, fileName);    
});*/

//-------------------------------student----------------------------------------------------

router.post('/signup',user.signupUser)
router.post('/login',users.loginuser)
router.post('/showcourses',course.showCourses)
//router.post('/downloadpdf',download.single('coursePdf'),course.coursepdf)

module.exports = router;



