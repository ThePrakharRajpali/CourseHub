var express = require('express');
var router = express.Router();

var { Year, Branch, Semester, yearKeys, branchKeys, semesterKeys} = require('../helper');

var Subject = require('../models/subject');
var Resource = require('../models/resource');



module.exports = router;

// index        
// show        
// new get          
// new post        
// edit get           
// edit post          
// delete get       
// delete post 