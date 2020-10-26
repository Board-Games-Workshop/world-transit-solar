var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressReactViews = require('express-react-views');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/** Set Template Engine */
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
