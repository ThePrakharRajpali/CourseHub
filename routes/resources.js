var express = require('express');
var router = express.Router();

var { Year, Branch, Semester, yearKeys, branchKeys, semesterKeys} = require('../helper');

var Subject = require('../models/subject');
var Resource = require('../models/resource');

router.get('/', (req, res) => {
    Resource.find({}, (err, foundResources) => {
        if(err) {
            console.log(err);
        } else {
            res.render("resources/index", {
                Resources: foundResources
            });
        }
    });
});

router.get('/new', (req, res) => {
    res.render("resources/new");
})

router.post('/new', (req, res) => {
    var name =  req.body.resourceNames;
    var subjectCode = req.body.resourceSubjectCode;
    Subject.find({subjectCode: subjectCode},  (err, foundSubject) => {
        if(err){
            console.log(err);
        } else {
            Resource.create({
                name: name,
                subjectCode: subjectCode
            }, (err, resource) => {
                if(err) {
                    console.log(err);
                } else {
                    resource.save();
                    foundSubject.resources.push(resource);
                    foundSubject.save();
                    res.redirect(`/resource/${resource._id}`);
                }
            });
        }
    });
});

// router.get('/:id', (req, res) => {
    
// });

module.exports = router;

// index        
// show        
// new get          
// new post        
// edit get           
// edit post          
// delete get       
// delete post 