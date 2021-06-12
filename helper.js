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

var deleteAllSubjects = () => {
    Subject.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed subjects");
        }
    })
}

var getSemesterString = (semesterNumber) => {
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

var getYearString = (yearNumber) => {
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

module.exports = { Year, Branch, Semester, yearKeys, branchKeys, semesterKeys, deleteAllSubjects, getSemesterString, getYearString};