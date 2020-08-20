const Course = require("../models/Course");
const mail = require("./mailer");

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

//for adding a new student using his student ID

function addNewStudent(req, res) {
  var courseID = req.body.courseid;
  var studentEmail = req.body.studentemail;

  Course.findOneAndUpdate(
    { courseid: courseID },
    { $addToSet: { enrolledStudents: studentEmail } },
    { new: true }
  )
    .then((data) => {
      if (data.length < 1) {
        res.send("already exist");
      } else {
        res.status(200).json({
          message: "student added successfully",
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
  var studentEmail = req.body.studentemail;

  Course.find({ enrolledStudents: { $in: studentEmail } }).then((data) => {
   // console.log(data);
    res.status(200).send(data);
  });
}


//for adding a coursepdf
function coursepdf(req, res, next) {
  
  console.log(req.file);

  let courseName = req.body.coursename;
  let courseLecturer = req.body.courselecturer;
  let coursedata = new Course({
    coursename: courseName,
    courselecturer: courseLecturer,
  image: req.file.path
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
module.exports = {
  addCourses,
  addNewStudent,
  showCourses,
  coursepdf
};