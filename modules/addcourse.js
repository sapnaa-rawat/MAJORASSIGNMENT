const Course = require("../models/Course");
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
  var studentID = req.body.studentid;

  Course.findOneAndUpdate(
    { courseid: courseID },
    { $push: { enrolledStudents: studentID } },
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
    console.log(data);
    res.status(200).send(data);
  });
}
module.exports = {
  addCourses,
  addNewStudent,
  showCourses,
};
