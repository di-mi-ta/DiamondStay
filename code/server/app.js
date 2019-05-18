var createError = require('http-errors');
var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homePostRouter = require('./routes/homePostRouter');
const hostPromoRouter = require('./routes/hostPromoRouter');
const systemPromoRouter = require('./routes/systemPromoRouter');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homeposts', homePostRouter);
app.use('/host-promotions', hostPromoRouter);
app.use('/system-promotions', systemPromoRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
