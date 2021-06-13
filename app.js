var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");
var path           = require('path');
var app =  express();

var url = "mongodb://localhost:27017/coursehub";

var indexRoutes = require('./routes/index');
var subjectRoutes = require('./routes/subject');
var resourceRoutes = require('./routes/resources');
// setting up mongoose connection
mongoose.connect(url, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err.message);
});

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/static/'))
app.use('/static', express.static(__dirname + '/static/'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.originalname}`)
//     }
// })
// deleteAllSubjects();

app.use('/', indexRoutes);
app.use('/subject', subjectRoutes);
app.use('/resource', resourceRoutes);
app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});


app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});


