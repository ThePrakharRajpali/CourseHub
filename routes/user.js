var express = require("express");
var bcrypt = require("bcryptjs");
var passport = require("passport");

var router = express.Router();

var Users = require("../models/user");
var {
  ensureAuthenticated,
  forwardAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../config/auth");

router.use(express.urlencoded({ extended: true }));

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.get("/", ensureAuthenticated, isSuperAdmin, (req, res) => {
  Users.find({}, (err, allusers) => {
    if (err) {
      console.log(err);
    } else {
      console.log(allusers);
      res.render("users/index", {
        allusers,
      });
    }
  });
});

router.get("/show", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("users/show", {
    user: req.user,
  });
});

router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("users/register");
});

router.post("/login", forwardAuthenticated, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/show",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/register", forwardAuthenticated, (req, res) => {
  var { username, email, password, password2, branch, joinyear } = req.body;

  var errors = [];

  if (!username || !email || !password || !password2 || !branch || !joinyear) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters." });
  }

  if (errors.length > 0) {
    res.render("register", {
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
    Users.findOne({ email: email }).then((user) => {
      if (user) {
        res.render("register", {
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
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();

  req.flash("success_msg", "You are logged out");

  res.redirect("/users/login");
});

router.get("/:id", ensureAuthenticated, (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render("users/show", {
        user,
      });
    }
  });
});

router.get("/:id/edit", ensureAuthenticated, (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render("users/edit", { user: user });
    }
  });
});

router.post("/:id/edit", ensureAuthenticated, async (req, res) => {
  var { email, username, branch, joinyear } = req.body;
  try {
    Users.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        user.email = email;
        user.username = username;
        user.branch = branch;
        user.joinyear = joinyear;
        user.save();
        res.redirect(`/users/${user._id}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/delete", ensureAuthenticated, async (req, res) => {
  try {
    var user = await Users.findById(req.params.id);
    if (req.user && (req.user == user || req.user.isSuperAdmin)) {
      if (user == req.user) {
        req.logout();
      }
      Users.removeById(req.params.id, (err) => {
        if (err) console.log(err);
        else {
          console.log("User deleted");
          res.redirect("/");
        }
      });
    } else {
      res.flash("error_msg", "You don't have permissions");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
