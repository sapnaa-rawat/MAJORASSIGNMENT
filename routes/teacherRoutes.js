var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/')
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
 /*limits:{
    fileSize:1024*1024*1024*1024*1024*1024*5
  },
  fileFilter:fileFilter*/
});

function authToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
  
      var decode = jwt.verify(token,'secretKey');
      console.log(decode._doc);
      next();
    } catch (err) {
      res.status(401).send("invalid t4oken");
    }
  }
var user1=require('../modules/teacherRegister')
var users1=require('../modules/teacherlogin')
var course=require('../modules/addcourse.js')

router.post('/signup',user1.signupteacher)
router.post('/login',users1.loginuser)
router.post('/addcourse',course.addCourses)
router.post('/addstudent',course.addNewStudent)
router.post('/uploadpdf',upload.single('coursePdf'),course.coursepdf)
router.post('/uploadpdf/multiple',upload.array('coursePdf',13),course.coursepdf)

module.exports = router;
