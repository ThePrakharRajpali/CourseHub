var express = require('express');
var router = express.Router();

var { Branch, Semester, branchKeys, semesterKeys} = require('../helper');

var Subject = require('../models/subject');

router.get("/", (req, res) => {
    res.render("home",{
        Semester     : Semester,
        semesterKeys : semesterKeys,
        Branch       : Branch,
        branchKeys   : branchKeys,
    });
});

router.get("/semester/:semester", (req, res) => {
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

router.get("/semester/:semester/branch/:branch", (req, res) => {
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

module.exports = router;