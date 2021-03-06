var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var hbs = require('hbs');
var smarthphonesRouter = require('./routes/smartphones');
var smarthphonesFrontRouter = require('./routes/smartphonesFront');

mongoose.connect('mongodb+srv://IngSoftwareEquipo:IngSoftwareEquipo@is2proyectoingsoftwaree.zlmno.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(() => { console.log('Conexión a base de datos exitosa')})
.catch((err) => console.log('Error:', err));


var app = express();

hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', smarthphonesRouter);
app.use('/smartphones', smarthphonesFrontRouter);

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

module.exports = app;
