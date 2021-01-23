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
    res.render("home",{Year:Year});
});

app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});

app.get("/allSubject", (req, res) => {
    Subject.find({}, (err, subjects) => {
        res.render("allSubject", {Subjects: subjects});
    });
});

app.get("/year/:year", (req, res) => {
    if(yearKeys.includes(req.params.year) && Year[req.params.year]){
            res.render("year", {
                Year         : Year[req.params.year],
                yearKeys     : yearKeys,
                Semester     : Semester,
                semesterKeys : semesterKeys,
                Branch       : Branch,
                branchKeys   : branchKeys,
            });
    } else {
        res.redirect("/404");
    }
});

app.get("/year/:year/semester/:semester", (req, res) => {
    if(yearKeys.includes(req.params.year) && Year[req.params.year] && semesterKeys.includes(req.params.semester) && Semester[req.params.year]){
        res.render("semester", {
            Year         : Year[req.params.year],
            yearKeys     : yearKeys,
            Semester     : Semester[req.params.year],
            semesterKeys : semesterKeys,
            Branch       : Branch,
            branchKeys   : branchKeys,
        });
    } else {
        res.redirect("/404");
    }
});

app.get("/year/:year/semester/:semester/branch/:branch", (req, res) => {
    if(year)
});

// app.delete("/subject/:subject_id", (req, res) => {
//     Subject.findByIdAndDelete(req.params.subject_id, (err, subject) => {
//         if(err){
//             console.log(err);
//             res.redirect("/404");
//         } else {
//             res.redirect("/");
//         }
//     });
// });
//

// // INDEX
// app.get("/year/:year/semester/:semester/branch/:branch", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.find({semester: req.params.semester, branch: req.params.branch}, (err, foundSubjects) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 res.render("branch", {
//                     Year    : Year[req.params.year],
//                     Semester: Semester[req.params.semester],
//                     Branch  : Branch[req.params.branch],
//                     Subjects: foundSubjects,
//                 });
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// // NEW
// app.get("/year/:year/semester/:semester/branch/:branch/new", (req, res) => {
//
//     if (yearKeys.includes(req.params.year) &&
//         semesterKeys.includes(req.params.semester) &&
//         branchKeys.includes(req.params.branch)) {
//         res.render("newSubject", {
//             Year    : Year[req.params.year],
//             Semester: Semester[req.params.semester],
//             Branch  : Branch[req.params.branch],
//             branchKeys : branchKeys,
//         });
//
//     } else {
//         res.redirect("/404");
//     }
// });
//
// // CREATE
// app.post("/year/:year/semester/:semester/branch/:branch", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         var name = req.body.name;
//         var year = req.body.year; // number
//         var branch = req.body.branch;
//         var semesterNumber = req.body.semesterNo; //number
//         var subjectCode = req.body.subjectCode;
//         var yearString = yearKeys[year -1];
//         var semesterString = semesterKeys[semesterNumber -1];
//         var newSubject = {
//             name:name,
//             year:yearString,
//             yearNumber:year,
//             branch: branch,
//             semester: semesterString,
//             semesterNumber:semesterNumber,
//             subjectCode: subjectCode
//         };
//
//         Subject.create(newSubject, (err, newlyCreated) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.redirect("/year/"+ req.params.year + "/semester/" + req.params.semester + "/branch/" + req.params.branch);
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// // SHOW
// app.get("/year/:year/semester/:semester/branch/:branch/subject/:subjectid", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findById(req.params.subjectid, (err, foundSubject) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 Resource.find({}, (err, resources) => {
//                     if(err){
//                         console.log(err);
//                     } else {
//                         res.render("subject", {
//                             Subject: foundSubject,
//                             Resources: resources,
//                             year: req.params.year,
//                             sem: req.params.semester,
//                             branch: req.params.branch,
//                             subject_id: foundSubject._id,
//                         });
//                     }
//                 })
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
//
// // TODO: Edit and update routes
// // EDIT
// app.get("/year/:year/semester/:semester/branch/:branch/subject/:subjectid/edit", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findById(req.params.subjectid, (err, foundSubject) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 res.render("editSubject", {
//                     subject: foundSubject,
//                     year: req.params.year,
//                     semester: req.params.semester,
//                     branch: req.params.branch,
//                 });
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// // UPDATE
// app.put("/year/:year/semester/:semester/branch/:branch/subject/:subjectid/up", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findByIdAndUpdate(req.params.subjectid, req.body.editsubject, (err, updatedSubject) => {
//             if(err){
//                 console.log(err);
//             } else {
//                 res.redirect('/');
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// // DESTROY
// app.delete("/year/:year/semester/:semester/branch/:branch/subject/:subjectid", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findByIdAndDelete(req.params.subjectid, (err, subject) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 res.redirect("/year/"+ req.params.year + "/semester/" + req.params.semester + "/branch/" + req.params.branch );
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
// });
//
//
//
// ////////////////////////////////////////////////////////////////////////////////
// app.get("/year/:year/semester/:semester/branch/:branch/subject/:subjectid/new", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findById(req.params.subjectid, (err, foundSubject) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 res.render("newResource", {subject: foundSubject});
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// app.post("/year/:year/semester/:semester/branch/:branch/subject/:subjectid", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//         Subject.findById(req.params.subjectid, (err, foundSubject) => {
//             if(err){
//                 console.log(err);
//                 res.redirect("/404");
//             } else {
//                 //TODO: Create resource
//             }
//         });
//     } else {
//         res.redirect("/404");
//     }
//
// });
//
// app.get("/year/:year/semester/:semester/branch/:branch/subject/:subjectid/resource/:resourceid/edit", (req, res) => {
//     if (yearKeys.includes(req.params.year) &&
//     semesterKeys.includes(req.params.semester) &&
//     branchKeys.includes(req.params.branch)) {
//
//     } else {
//         res.redirect("/404");
//     }
// });


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
