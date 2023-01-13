let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let indexRouter = require('./routes/index');

// Authentication
let authRouter = require('./routes/auth/authentication');
let refreshTokenRouter = require('./routes/token/refreshToken');

let applicantRouter = require('./routes/applicant');
let applicantsocmedRouter = require('./routes/applicantsocmed');

// supporting data
let userRouter = require('./routes/user');
let schoolRouter = require('./routes/school');
let professionRouter = require('./routes/profession');
let socialmediaRouter = require('./routes/socialmedia');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Authentication
app.use('/auth', authRouter);
app.use('/refreshToken', refreshTokenRouter);

app.use('/applicant', applicantRouter);
app.use('/applicantsocmed', applicantsocmedRouter);

// supporting route
app.use('/user', userRouter);
app.use('/school', schoolRouter);
app.use('/profession', professionRouter);
app.use('/socialmedia', socialmediaRouter);


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
