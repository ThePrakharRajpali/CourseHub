var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");

var app =  express();

var Subject  = require('./models/subject');
var Resource = require('./models/resource')

var url = "mongodb://localhost:27017/coursehub";

var { Year, Branch, Semester, yearKeys, branchKeys, semesterKeys} = require('./helper.js');

var indexRoutes = require('./routes/index');
var subjectRoutes = require('./routes/subject');

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
app.use(methodOverride("_method"));




// deleteAllSubjects();

////////////////////////////////////////////////////////////////////////////////
// HOME SCREEN
////////////////////////////////////////////////////////////////////////////////

app.use('/', indexRoutes);
app.use('/subject', subjectRoutes);
app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});

////////////////////////////////////////////////////////////////////////////////

app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});

function deleteAllSubjects() {
    Subject.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed subjects");
        }
    })
}

function getSemesterString(semesterNumber){
    switch (semesterNumber) {
        case '1' || 1:
            return "first";
        case '2' || 2:
            return "second";
        case '3' || 3:
            return "third";
        case '4' || 4:
            return "fourth";
        case '5' || 5:
            return "fifth";
        case '6' || 6:
            return "sixth";
        case '7' || 7:
            return "seventh";
        case '8' || 8:
            return "eighth";
        default:
            return null;
    }
}

function getYearString(yearNumber) {
    switch(yearNumber){
        case 1 || '1':
            return "firstYear";
        case 2 || '2':
            return "secondYear";
        case 3 || '3':
            return "thirdYear";
        case 4 || '4':
            return "fourthYear";
        default:
            return null;
    }
}
