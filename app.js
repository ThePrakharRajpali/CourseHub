var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");
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
//INDEX
app.get("/", (req, res) => {
    Semester.find({}, (err, semesters) => {
        if(err){
            console.log(err);
        } else {
            res.render("home", {semesters: semesters});
        }
    });
});
//NEW
app.get("/new", (req, res) => {
    res.render("newSemester");
});
//CREATE
app.post("/", (req, res) => {
    var name = req.body.name;
    var semNum = req.body.semNum;
    var newSemester = {name: name, semNum: semNum};
    Semester.create(newSemester, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/");
        }
    })
});
//SHOW
app.get("/:semester", (req, res) => {
    Semester.find({name: req.params.semester}, (err, foundSemester) => {
        if(err) {
            console.log(err);
        } else {
            console.log(foundSemester);
            res.render("year", {sem:foundSemester});
        }
    })
});
//EDIT
app.get("/:semester/edit",(req, res) => {
    Semester.find({name: req.params.semester}, (err, foundSemester) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundSemester);
            res.render("editSemester", {sem : foundSemester});
        }
    });
});
//UPDATE
app.put("/:semester", (req, res) => {
    Semester.findOneAndUpdate({name: req.params.semester}, newSemester, (err, updatedSemester) => {
        if(err){
            console.log(err);
        }else{
            console.log(updatedSemester);
            res.redirect("/"+req.params.semester);
        }
    });
});
//DESTROY
app.get("/:semester/delete", (req, res) => {
    Semester.findOneAndDelete({name: req.params.semester}, (err, deletedSemester) => {
        if(err){
            console.log(err);
        }else{
            console.log(deletedSemester);
            res.redirect("/");
        }
    });
});

////////////////////////////////////////////////////////////////////////////////




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
