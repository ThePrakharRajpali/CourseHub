var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var express    = require("express");

var app =  express();

var Semester = require('./models/semester');
var Subject  = require('./models/subject');
var Branch   = require('./models/branch');

var url = "mongodb://localhost:27017/coursehub";

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
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/:semester", (req, res) => {
    var semester = req.params.semester;
    console.log(semester);
    res.render("year", {semester: semester});
});

app.get("/:semester/:branch", (req, res) => {
    var branch = req.params.branch;
    var semester = req.params.semester;
    console.log(branch);
    res.render("branch", {
        semester: semester,
        branch: branch
    });
});

app.get("/:semester/:branch/:subject", (req, res) => {
    var subject = req.params.subject;
    var branch = req.params.branch;
    var semester = req.params.semester;
    console.log(subject);
    res.render("subject", {
        semester: semester,
        branch: branch,
        subject: subject
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});
