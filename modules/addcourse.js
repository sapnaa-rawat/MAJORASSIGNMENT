const Course = require("../models/Course");
const mail = require("./mailer");
const Students = require("../models/student");
const tests=require("../models/test");
const http=require('http')
const fs=require('fs')

//for adding a new course

function addCourses(req, res, next) {
  let courseName = req.body.coursename;
  let courseLecturer = req.body.courselecturer;
  let coursedata = new Course({
    coursename: courseName,
    courselecturer: courseLecturer,
  });
  coursedata
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "course added successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.send({ message: "course not added" });
    });
}

//get all courses
async function getCourses(req, res, next) {
try{
  const course=await Course.find({});
  res.json({
    success:true,
    total:course.length,
    courses:course
  })
}catch(err){
  next(err);
}
};


//update a course
async function updateCourses(req, res, next) {
  try{
    const course=await Course.findById(req.params.id);
    if(!course){
      return res.json({
        success:false,
        message:"course id doesnot exist",
      }); 
    }else{
      let updateCourse=await Course.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValdator:true
      });
      res.json({
        success:false,
        message:"course updated successfully",
        student:updateCourse
      });
    }
    }catch(err){
      next(error);
    }
  }

//Delete a Course with the help of course id 
async function deleteCourses(req, res, next) {
  try{
    let course=await Course.findById(req.params
      .id);
    if(!course){
      return res.json({
        success:false,
        message:"course id doesnot exist",
      }); 
    }else{
await course.remove();
res.json({
  success:true,
  message:`course with id $(req.params.id) deleted successfully`,
  course:{}
})
    }
  }catch(error){
    next(error);
  }
};

//remove student using his student ID

function removeStudent(req, res) {
  var courseID = req.body.courseid;
  var studentEmail = req.body.studentemail;

  Course.findOneAndUpdate(
    { courseid: courseID },
    { $pull: { enrolledStudents: studentEmail } },
    { new: true }
  )
    .then((data) => {
      if (data.length < 1) {
        res.send("already exist");
      } else {
        res.status(200).json({
          message: "student removed successfully",
          results: data,
        });
        mail.sendingMail(studentEmail);
      }
    })

    .catch((err) => {
      res.json(err);
    });
}
//For checking which courses he's enrolled in
function showCourses(req, res) {
  var studentId = req.body.studentid;

  Course.find({ enrolledStudents: { $in: studentId } }).then((data) => {
    // console.log(data);
    res.status(200).send(data);
  });
}



//for adding a testpdf
function coursepdf(req, res, next) {
  
  console.log(req.file);

  let testName= req.body.testname;
  let courseId = req.body.courseid;
  let maximumMarks=req.body.maximummarks;
 
  let coursedata = new tests({
    testname:testName,
    courseid: courseId ,
    maximummarks:maximumMarks,
    file:req.file.originalname
   
  });
  
  coursedata
      .save()
    .then((doc) => {
      res.status(201).json({
        message: "coursepdf added successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
  }
  
 
//can chek the test from specific course

async function checkTest(req, res, next) {
  try{
    const test=await tests.findById(req.paramas.id);
    if(!test){
      return res.json({
        success:false,
        message:"test id doesnot exist",
      }); 
    }else{ 
    let checkTest=await tests.find(req.params.id,req.body,{
      new:true,
      runValdator:true
    })
    res.json({
      success:false,
        message:"test id doesnot exist",
       student:checkTest

    });
  }
      }catch(err){
        next(error)
      }
    }



//update marks of student

async function addMarks(req, res, next) {
  try{var marksGiven = {
    courseID: req.body.courseid,
    marksObtained: req.body.marks,
  };
    const course=await Course.findOne({courseid:req.body.courseid});
    if(!course){
      return res.json({
        success:false,
        message:"course id doesnot exist",
      }); 
    }else{
      
      Students.findOneAndUpdate(
      { studentid: req.body.studentid },
      { $addToSet: { marks: marksGiven } },
      { new: true }
    )
     .then((data) => {
        res.status(200).json({ message: "added successfully", results: data });
      })
    }
  }
    catch(error){
      next(error);
    
    }
  }
  


module.exports = {
  getCourses,
  addCourses,
  updateCourses,
  removeStudent,
  showCourses,
  coursepdf,
  addMarks,
  deleteCourses,
  checkTest
}