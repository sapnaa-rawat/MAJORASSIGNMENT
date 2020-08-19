var mongoose = require("mongoose");
var Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);
// Schema definition
var CourseSchema = new Schema({
  coursename: {
    type: String,
    required: true,
  },
  courselecturer: {
    type: String,
    required: true,
  },
  enrolledStudents: [],
  courseid: {
    type: Number,
  },
});
CourseSchema.plugin(autoIncrement.plugin, {
  //auto increment implementation
  model: "Course",
  field: "courseid",
  startAt: 1000,
});

// Compile model from schema
var CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;
