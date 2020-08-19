var mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);


var Course = new Schema({
coursename: {type:String,
    required:true,
    
    },
courselecturer: {type:String,
        required:true,
},
image:{type:String,
        required:true,
      },
courseid: {type:Number
            },
  enrolledStudents:[],

});

Course.plugin(autoIncrement.plugin, {
  model: "Course",
  field: "courseid",
  startAt: 1000,
});
var Course = mongoose.model('Course', Course );
module.exports = Course;