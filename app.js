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
    "firstYear": {
        number: 1,
        name: "Freshman Year",
        semesters: [
            "first",
            "second"
        ]
    },

    "secondYear": {
        number: 2,
        name: "Sophomore Year",
        semesters: [
            "third",
            "fourth"
        ]
    },

    "thirdYear": {
        number: 3,
        name: "Pre-final Year",
        semesters: [
            "fifth",
            "sixth"
        ]
    },

    "fourthYear": {
        number: 4,
        name: "Final Year",
        semesters: [
            "seventh",
            "eighth"
        ]
    }
}

var Semester = {
    "first" : {
        name: "first",
        num: 1,
    },
    "second" : {
        name: "second",
        num: 2,
    },
    "third" : {
        name: "third",
        num: 3,
    },
    "fourth" : {
        name: "fourth",
        num: 4,
    },
    "fifth" : {
        name: "fifth",
        num: 5,
    },
    "sixth" : {
        name: "sixth",
        num: 6,
    },
    "seventh" : {
        name: "seventh",
        num: 7,
    },
    "eighth" : {
        name: "eighth",
        num: 8,
    },
}

var Branch = {
    "CSE" : {
        name: "CSE",
    },
    "MNC" : {
        name: "MNC",
    },
    "ECE" : {
        name: "ECE",
    },
    "EEE" : {
        name: "EEE",
    },
    "Mech" : {
        name: "Mech",
    },
    "Chem" : {
        name: "Chem",
    },
    "Civil" : {
        name: "Civil",
    },
    "CST" : {
        name: "CST",
    },
    "EPH" : {
        name: "EPH",
    },
    "BSBE" : {
        name: "BSBE",
    },
}
////////////////////////////////////////////////////////////////////////////////
// HOME SCREEN
////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home",{Year:Year});
});

app.get("/:year", (req,res) => {
    if(Year[req.params.year]){
        res.render("year", {year: Year[req.params.year]});
    }
});

app.get("/:year/:semester", (req, res) => {
    res.render("semester", {
        year: Year[req.params.year],
        semester: Semester[req.params.semester]
    });
});

app.get("/:year/:semester/:branch", (req, res) => {
    res.render("branch", {
        year: Year[req.params.year],
        semester: Semester[req.params.semester],
        branch: Branch[req.params.branch]
    });
});


app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});
