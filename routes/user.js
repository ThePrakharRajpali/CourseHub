var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');

var router = express.Router();

var Users = require('../models/user');
var { forwardAuthenticated, isAdmin } = require('../config/auth');

router.use(express.urlencoded({ extended:true }));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/register', (req, res) => {
    var { username, email, password, password2, branch, joinyear } = req.body;

    var errors = [];

    if(!username || !email || !password || !password2 || !branch || !joinyear) {
        errors.push({msg: 'Please enter all fields'});
    }

    if(password != password2) {
        errors.push({msg:'Passwords do not match'});
    }

    if(password.length < 6) {
        errors.push({msg: 'Password should be atleast 6 characters.'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2,
            branch,
            joinyear,
        });
    } else {
        //Create a new user
        Users.findOne({email: email}).then(user => {
            if(user) {
                res.render('register', {
                    errors,
                    username,
                    email,
                    password,
                    password2,
                    branch,
                    joinyear,
                });
            } else {
                var newUser = new Users({
                    username,
                    email,
                    password,
                    branch,
                    joinyear,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout()

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

module.exports = router;