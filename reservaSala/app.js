var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var indexRouter = require('./routes/index');
var salasRouter = require('./routes/salas');
var reservasRouter = require('./routes/reservas');
var usuariosRouter = require('./routes/usuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('claveSecreta',process.env.SECRET_KEY);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** HEADER INICIO */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.send(200);
});
/** HEADER FIN */

app.use('/', indexRouter);
app.use('/salas', validateUser, salasRouter);
app.use('/reservas', validateUser, reservasRouter);
app.use('/usuarios', usuariosRouter);

//La siguiente función es para hacer la verificación del TOKEN y que al usuario le permita ingresar a la ruta que quiera
function validateUser(req,res,next){
  jwt.verify(req.headers["x-access-token"],req.app.get("claveSecreta"),function(err,decoded){
    if (err){
      res.json({message:err.message})
    } else {
      console.log(decoded);
      req.body.datosToken = decoded;
      next();
    }
  })
}
app.validateUser = validateUser;

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
