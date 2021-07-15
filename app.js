var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var methodOverride = require("method-override");
var path = require("path");
var morgan = require("morgan");
var cors = require("cors");
var multer = require("multer");
var passport = require("passport");
var flash = require("connect-flash");
var session = require("express-session");

var app = express();
var url = "mongodb://localhost:27017/coursehub";

var indexRoutes = require("./routes/index");
var subjectRoutes = require("./routes/subject");
var resourceRoutes = require("./routes/resources");
var userRoutes = require("./routes/user");

var {
  deleteAllSubjects,
  deleteAllResources,
  makeAdmins,
  makeSuperAdmins,
  deleteAllUsers,
} = require("./helper");

// setting up mongoose connection
mongoose
  .connect(url, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Passport config
require("./config/passport")(passport);

app.use(
  session({
    secret: "something",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Connect with FLash
app.use(flash());

//Global variable used in flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Serving static files
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/static/"));
app.use("/static", express.static(__dirname + "/static/"));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// deleteAllSubjects();
// deleteAllResources();
// deleteAllUsers();
//makeAdmins();
//makeSuperAdmins();

app.use("/", indexRoutes);
app.use("/subject", subjectRoutes);
app.use("/resource", resourceRoutes);
app.use("/users", userRoutes);
app.get("/404", (req, res) => {
  res.send("<h1>404 not found</h1>");
});

app.listen(3000, process.env.IP, () => {
  console.log("Server started at Port:3000");
});
