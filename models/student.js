var mongoose = require("mongoose");
var Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);
//Schema Definition
var Students = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    }, //for checking email validation
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  studentid: { type: Number }, // used as primary key
  password: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Compile model from schema
Students.plugin(autoIncrement.plugin, {
  model: "Student",
  field: "studentid",
  startAt: 100,
});

var userModel = mongoose.model("Student", Students);
module.exports = userModel;