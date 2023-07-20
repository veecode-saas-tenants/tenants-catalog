var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0', });

var indexRouter = require('./routes/index');
var echoRouter = require('./routes/echo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.set('json spaces', 2)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/echo', echoRouter);

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
const applicationPort = 4000
var listener = app.listen(applicationPort, function(){
  console.log(`Running on port ${listener.address().port}`); //Listening on port 8888
});

//SWAGGER GEN
const doc = {
  info: {
    title: "${{'${{'}} values.componentId ${{'}}'}}",
    description: "${{'${{'}} values.description ${{'}}'}}",
  },
  host: `localhost:${applicationPort}`,
  schemes: ['http'],
};

const outputFile = '../openapi-swagger.json';
const endpointsFiles = ['app.js', './routes/index.js', './routes/echo.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);

module.exports = app;
