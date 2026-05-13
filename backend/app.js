require('dotenv').config('./.env');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var authRouter = require('./src/routes/auth');
var doctorRouter = require('./src/routes/doctor');
var bookingRouter = require('./src/routes/booking');
var hospitalRouter = require('./src/routes/hospital');
const cron = require('node-cron');
const { syncSchedules } = require('./src/services/scheduleSync.service');

var app = express();

// buat jadwal setiap hari 
cron.schedule('0 0 * * *', () => {
    syncSchedules();
});

// jalankan saat server start
syncSchedules();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/api', doctorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/hospital-updates', hospitalRouter);

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
