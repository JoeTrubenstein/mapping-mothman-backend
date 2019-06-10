var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var passport = require("passport");
var cors = require('cors')

// var flash  = require("flash");
// var session = require('express-session')
// var moment = require('moment')
// var MongoStore = require("connect-mongo")(session);

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch(err => console.log(`ERROR: ${err}`));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
require("./utils/passport")(passport);

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     store: new MongoStore({
//       url: process.env.MONGODB_URI,
//       autoReconnect: true
//     }),
//     cookie: {
//       secure: false,
//       maxAge: 365 * 24 * 60 * 60 * 1000
//     }
//   })
// );

//app.use(flash());

// app.use(passport.session());



// locals
// app.use(function(req, res, next) {
//   res.locals.user = req.user;
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
