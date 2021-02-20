var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");

var app =  express();

var Subject  = require('./models/subject');
var Resource = require('./models/resource')

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
app.use(methodOverride("_method"));

var Year = {
    firstYear: {
        number: 1,
        name: "Freshman Year",
        linkName: "firstYear",
        semesters: [
            "first",
            "second"
        ]
    },

    secondYear: {
        number: 2,
        name: "Sophomore Year",
        linkName: "secondYear",
        semesters: [
            "third",
            "fourth"
        ]
    },

    thirdYear: {
        number: 3,
        name: "Pre-final Year",
        linkName: "thirdYear",
        semesters: [
            "fifth",
            "sixth"
        ]
    },

    fourthYear: {
        number: 4,
        name: "Final Year",
        linkName: "fourthYear",
        semesters: [
            "seventh",
            "eighth"
        ]
    }
}

var Semester = {
    first : {
        name: "first",
        num: 1,
    },
    second : {
        name: "second",
        num: 2,
    },
    third : {
        name: "third",
        num: 3,
    },
    fourth : {
        name: "fourth",
        num: 4,
    },
    fifth : {
        name: "fifth",
        num: 5,
    },
    sixth : {
        name: "sixth",
        num: 6,
    },
    seventh : {
        name: "seventh",
        num: 7,
    },
    eighth : {
        name: "eighth",
        num: 8,
    },
}

var Branch = {
    freshmen: {
        name: "freshmen",
        code: 0,
        branchImage: "",
    },
    CSE : {
        name: "CSE",
        code: 1,
        branchImage: "",
    },
    MNC : {
        name: "MNC",
        code: 23,
        branchImage: "",
    },
    ECE : {
        name: "ECE",
        code: 2,
        branchImage: "",
    },
    EEE : {
        name: "EEE",
        code: 3,
        branchImage: "",
    },
    Mech : {
        name: "Mech",
        code: 4,
        branchImage: "",
    },
    Chem : {
        name: "Chem",
        code: null,
        branchImage: "",
    },
    Civil : {
        name: "Civil",
        code: null,
        branchImage: "",
    },
    CST : {
        name: "CST",
        code: null,
        branchImage: "",
    },
    EPH : {
        name: "EPH",
        code: null,
        branchImage: "",
    },
    BSBE : {
        name: "BSBE",
        code: null,
        branchImage: "",
    },
}

var yearKeys     = Object.keys(Year);
var branchKeys   = Object.keys(Branch);
var semesterKeys = Object.keys(Semester);

// deleteAllSubjects();

////////////////////////////////////////////////////////////////////////////////
// HOME SCREEN
////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home",{
        Semester     : Semester,
        semesterKeys : semesterKeys,
        Branch       : Branch,
        branchKeys   : branchKeys,
    });
});

app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});

app.get("/semester/:semester", (req, res) => {
    if(semesterKeys.includes(req.params.semester) && Semester[req.params.semester]){
        res.render("semester", {
            Semester     : Semester[req.params.semester],
            semesterKeys : semesterKeys,
            Branch       : Branch,
            branchKeys   : branchKeys,
        });
    } else {
        res.redirect("/404")
    }
});

app.get("/semester/:semester/branch/:branch", (req, res) => {
    if(
        semesterKeys.includes(req.params.semester)
        && branchKeys.includes(req.params.branch)
        && Branch[req.params.branch]
    ) {
        Subject.find({
            branch : req.params.branch,
            semester : req.params.semester
        }, (err, subjects) => {
            if(err) {
                console.log(err);
            } else {
                res.render("branch", {
                    Semester     : Semester[req.params.semester],
                    semesterKeys : semesterKeys,
                    Branch       : Branch[req.params.branch],
                    branchKeys   : branchKeys,
                    Subjects     : subjects,
                });
            }
        })
    } else {
        res.redirect("/404")
    }
});

app.get("/semester/:semester/branch/:branch/new", (req, res) =>{
    if(
        semesterKeys.includes(req.params.semester)
        && branchKeys.includes(req.params.branch)
        && Branch[req.params.branch]
    ) {
        res.redirect("/subject/new")
    } else {
        res.redirect("/404")
    }
})

// app.get("/semester/:semester/branch/:branch/subject/:subject", (req, res) => {
//     if(
//         semesterKeys.includes(req.params.semester)
//         && branchKeys.includes(req.params.branch)
//         && Branch[req.params.branch]
//     ) {
//         res.redirect(`/subject/${req.params.subject}`);
//     } else {
//         res.redirect("/404")
//     }
// });
app.get("/subject", (req, res) => {
    Subject.find({}, (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            res.render("subjects/index", {
                Subjects : foundSubject,
            })
        }
    })
});

app.get("/subject/new", (req, res) => {
    res.render("subjects/new");
});

app.get("/subject/:subject", (req, res) => {
    Subject.findById(req.params.subject, (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            Resource.find({
                    courseNumber: foundSubject.subjectCode
                }, (err, foundResources) => {

                if(err){
                    console.log(err);
                } else {
                    res.render('subjects/show', {
                        Subject : foundSubject,
                        Resources : foundResources
                    });
                }
            });
        }
    });
});

app.post("/subject", (req, res) => {
    var name           = req.body.subjectName;
    var branch         = req.body.subjectBranch;
    var semesterNumber = req.body.subjectSemesterNumber;
    var subjectCode    = req.body.subjectCode;
    var semester       = getSemesterString(semesterNumber);

    var newSubject = new Subject({
        name           : name,
        branch         : branch,
        semester       : semester,
        semesterNumber : semesterNumber,
        subjectCode    : subjectCode
    });

    newSubject.save(err => {
        if(err) {
            console.log(err);
        } else {
            console.log(newSubject);
            res.redirect("/subject")
        }
    });
});

app.get("/subject/:subject/edit", (req, res) => {
    Subject.findById(req.params.subject, (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            res.render('subjects/edit', {
                Subject : foundSubject,
            });
        }
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});


function deleteAllSubjects() {
    Subject.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Removed subjects");
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
