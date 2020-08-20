const Course = require("../models/Course");
const mail = require("./mailer");
const Students = require("../models/student");
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
  var courseID = req.body.courseid;
  // var studentEmail = req.body.studentemail;

  Course.findOneAndUpdate({ courseid: courseID }, { image: req.file.path })
    .then((data) => {
      if (data.length < 1) {
        res.send("already exist");
      } else {
        res.status(200).json({
          message: "added successfully",
          results: data,
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
}

function addMarks(req, res) {
  var marksGiven = {
    courseID: req.body.courseid,
    marksObtained: req.body.marks,
  };
  Students.findOneAndUpdate(
    { studentid: req.body.studentid },
    { $addToSet: { marks: marksGiven } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({ message: "added successfully", results: data });
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = {
  addCourses,
  addNewStudent,
  showCourses,
  coursepdf,
  addMarks,
};
