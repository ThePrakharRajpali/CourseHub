var express = require('express');
var router = express.Router();

var { Year, Branch, Semester, yearKeys, branchKeys, semesterKeys} = require('../helper');

var Subject = require('../models/subject');
var Resource = require('../models/resource');

router.get('/', (req, res) => {
    Subject.find({}, (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            res.render("subjects/index", {
                Subjects : foundSubject,
            })
        }
    })
})

router.get('/new', (req, res) => {
    res.render("subjects/new");
})

router.get('/:subject', (req, res) => {
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

router.post("/new", (req, res) => {
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

router.get("/:subject/edit", (req, res) => {
    Subject.findById(req.params.subject, (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            res.render('subjects/edit', {
                Subject    : foundSubject,
                Branch     : Branch,
                branchKeys : branchKeys
            });
        }
    });
});

router.post("/:subject/edit", (req, res) => {
    var name           = req.body.subjectName;
    var branch         = req.body.subjectBranch;
    var semesterNumber = req.body.subjectSemesterNumber;
    var subjectCode    = req.body.subjectCode;
    var semester       = getSemesterString(semesterNumber);

    var editedSubject = {
        name           : name,
        branch         : branch,
        semester       : semester,
        semesterNumber : semesterNumber,
        subjectCode    : subjectCode
    };

    Subject.findByIdAndUpdate(req.params.subject, editedSubject, (err, updatedSubject) => {
        if(err) {
            console.log(err);
        } else {
            console.log(updatedSubject);
            res.redirect(`/subject/${updatedSubject._id}`)
        }
    });
})

router.post("/:subject/delete", (req, res) => {
    Subject.remove({_id: req.params.subject}, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('subject deleted');
            res.redirect("/")
        }
    })
});


module.exports = router;

// index       x 
// show        x
// new get     x     
// new post    x    
// edit get    x       
// edit post   x       
// delete get       
// delete post 