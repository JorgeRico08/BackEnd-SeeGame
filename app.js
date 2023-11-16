require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sesion = require('express-session');
var adminR = require('./routes/admin')
var auth = require('./routes/auth');
var userR = require('./routes/users');
const routerApi = require('./routes/api');

const db = require("./config/DBConnection");

var app = express();

db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  sesion({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  })
);

// Configuración de CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:50629'];
  const origin = req.headers.origin;

  console.log(origin)
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Permite credenciales

  next();
});

app.use(auth);
app.use(adminR);
app.use(userR);
app.use("/api", routerApi);



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
