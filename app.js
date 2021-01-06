var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");

var app =  express();

var Subject  = require('./models/subject');

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

var Year = {
    firstYear: {
        number: 1,
        name: "Freshman Year",
        semesters: [
            "first",
            "second"
        ]
    },

    secondYear: {
        number: 2,
        name: "Sophomore Year",
        semesters: [
            "third",
            "fourth"
        ]
    },

    thirdYear: {
        number: 3,
        name: "Pre-final Year",
        semesters: [
            "fifth",
            "sixth"
        ]
    },

    fourthYear: {
        number: 4,
        name: "Final Year",
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
    "seventh" : {
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
    },
    CSE : {
        name: "CSE",
        code: 1,
    },
    MNC : {
        name: "MNC",
        code: 23,
    },
    ECE : {
        name: "ECE",
        code: 2,
    },
    EEE : {
        name: "EEE",
        code: 3,
    },
    Mech : {
        name: "Mech",
        code: 4,
    },
    Chem : {
        name: "Chem",
        code: null,
    },
    Civil : {
        name: "Civil",
        code: null,
    },
    CST : {
        name: "CST",
        code: null,
    },
    EPH : {
        name: "EPH",
        code: null,
    },
    BSBE : {
        name: "BSBE",
        code: null,
    },
}

var yearKeys     = Object.keys(Year);
var branchKeys   = Object.keys(Branch);
var semesterKeys = Object.keys(Semester);

////////////////////////////////////////////////////////////////////////////////
// HOME SCREEN
////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home",{Year:Year});
});

app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});

app.get("/:year", (req,res) => {
    if( yearKeys.includes(req.params.year) ){
        if(Year[req.params.year]){
            res.render("year", {year: Year[req.params.year]});
        }
    } else {
        res.redirect("/404");
    }

});

app.get("/:year/:semester", (req, res) => {
    if(yearKeys.includes(req.params.year) && semesterKeys.includes(req.params.semester)){
        res.render("semester", {
            year: Year[req.params.year],
            semester: Semester[req.params.semester]
        });
    } else {
        res.redirect("/404");
    }

});

// INDEX
app.get("/:year/:semester/:branch", (req, res) => {
    if (yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.find({semester: req.params.semester, branch: req.params.branch}, (err, foundSubjects) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                res.render("branch", {
                    year    : Year[req.params.year],
                    semester: Semester[req.params.semester],
                    branch  : Branch[req.params.branch],
                    subjects: foundSubjects,
                });
            }
        });
    } else {
        res.redirect("/404");
    }

});

// NEW
app.get("/:year/:semester/:branch/new", (req, res) => {

    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        res.render("newSubject");

    } else {
        res.redirect("/404");
    }
});

// CREATE
app.post("/:year/:semester/:branch", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        // res.redirect("/:year/:semester/:branch")
        // TODO: create route
    } else {
        res.redirect("/404");
    }

});

// SHOW
app.get("/:year/:semester/:branch/:subject", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.find({name: req.params.subject}, (err, foundSubject) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                Resource.find({}, (err, resources) => {
                    if(err){
                        console.log(err);
                    } else {
                        res.render("subject", {subject: foundSubject, resources: resources});
                    }
                })
            }
        });
    } else {
        res.redirect("/404");
    }

});

// EDIT
app.get("/:year/:semester/:branch/:subject/edit", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.find({name: req.params.subject}, (err, foundSubject) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                res.render("editSubject", {subject: foundSubject});
            }
        });
    } else {
        res.redirect("/404");
    }

});

// UPDATE
app.put("/:year/:semester/:branch/:subject", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
// TODO: Add update code
    } else {
        res.redirect("/404");
    }

});

// DESTROY
app.delete("/:year/:semester/:branch/:subject/delete", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.findOneAndDelete({name: req.params.subject}, (err, subject) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                res.redirect("/:year/:semester/:branch");
            }
        });
    } else {
        res.redirect("/404");
    }

});

app.get("/:year/:semester/:branch/:subject/new", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.find({name: req.params.subject}, (err, foundSubject) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                res.render("newResource", {subject: foundSubject});
            }
        });
    } else {
        res.redirect("/404");
    }

});

app.post("/:year/:semester/:branch/:subject", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {
        Subject.find({name:req.params.subject}, (err, foundSubject) => {
            if(err){
                console.log(err);
                res.redirect("/404");
            } else {
                //TODO: Create comment
            }
        });
    } else {
        res.redirect("/404");
    }

});

app.get("/:year/:semester/:branch/:subject/:resource/edit", (req, res) => {
    if ((yearKeys.includes(req.params.year) &&
    semesterKeys.includes(req.params.semester) &&
    branchKeys.include(req.params.branch)) {

    } else {
        res.redirect("/404");
    }
});


app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});
