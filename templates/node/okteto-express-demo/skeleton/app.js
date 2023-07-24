var env = process.env.NODE_ENV || "development";
var appVersion = 4000;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

var indexRouter = require("./routes/index");
var echoRouter = require("./routes/echo");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.set("json spaces", 2);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/echo", echoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
var listener = app.listen(appVersion, function () {
  console.log(`Running on port ${appVersion}`); //Listening on port 8888
});

//SWAGGER GEN
if (env === "local") {
  const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.1" });

  const doc = {
    info: {
      title: "${{ values.componentId }}",
      description: "${{ values.description }}",
    },
    servers: [
      {
        url: "https://${{ values.componentId }}-${{ values.oktetoNamespace }}.cloud.okteto.net",
        description: "Okteto dev environment",
      },
      {
        url: `http://localhost:${appVersion}`,
        description: "Localhost environment",
      },
    ],
    definitions: {
      EchoResponse: {
        response: "your echo ${echo}",
      },
      DefaultResponse: {
        status: "express app is running",
        "date-time": "2023-07-21T20:54:09.379Z",
      },
    },
    produces: ["application/json"],
  };

  const outputFile = "./openapi-swagger.json";
  const endpointsFiles = ["app.js"];
  swaggerAutogen(outputFile, endpointsFiles, doc);
}
module.exports = app;
