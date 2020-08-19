var mongoose = require("mongoose");
var Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);
//Schema Definition
var teachers = new Schema({
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
    }, // for email validation
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  teacherid: { type: Number },
});

// Compile model from schema
teachers.plugin(autoIncrement.plugin, {
  model: "teacher",
  field: "teacherid",
  startAt: 1,
});
var userModel = mongoose.model("teacher", teachers);
module.exports = userModel;
