var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var pug = require('pug');
var bodyParser = require('body-parser');



 

var app=pug;
var app = express();


//teacher/student routes
var usersRouter = require('./routes/users');
var teacherRouter=require('./routes/teacherRoutes');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*
var pathh = path.resolve(__dirname, 'public');
app.use(express.static(pathh));
*/

app.use('/public/uploads',express.static(__dirname+"/public/uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());


app.use('/student', usersRouter);
app.use('/teacher', teacherRouter);

//mongoose connection
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

const db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('connected');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(400).json({
error:"page not found"
  });
  /*res.status(500).json({
    error:"internal server error"
  });*/
});

module.exports = app;
