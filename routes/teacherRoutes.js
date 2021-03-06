  
var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var teacher=require('../modules/teacherRegister')
var users1=require('../modules/teacherlogin')
var course=require('../modules/addcourse.js')
var multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ file.originalname)
  }
})
const fileFilter=(req, file, cb)=>{
  if (file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'||file.mimetype==='image/png'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

var upload = multer({
  storage:storage,
  /*
limits:{
    fileSize:1024*1024*1024*1024*1024*1024*5
  },
  fileFilter:*/
});

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


router.post('/signup',teacher.signupteacher)
router.post('/signupuser',teacher.signupUser)
router.post('/login',users1.loginuser)
router.post('/addcourse',authToken,course.addCourses)
router.get('/allcourses',authToken,course.getCourses)
router.put('/updatecourses/:id',authToken,course.updateCourses)
router.delete('/deleteCourse:id',authToken,course.deleteCourses)
router.post('/removestudent',authToken,course.removeStudent,)
router.post('/updatemarks',authToken,course.addMarks)
router.post('/uploadpdf',upload.single('coursePdf'),authToken,course.coursepdf)
router.post('/uploadpdf/multiple',upload.array('coursePdf',13),course.coursepdf)




module.exports = router;
