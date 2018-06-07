var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
require('dotenv').config();

var menuRouter = require('./routes/menuController');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/menu', menuRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

//CONNECT MONGOOSE TO "donut_store"
mongoose.connect('mongodb://localhost/menu_builder');

//CREATE THE MONGOOSE CONNECTION
const db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function () {
    console.log("Database has been connected!");
});

module.exports = app;
