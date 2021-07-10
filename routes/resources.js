var express = require("express");
var router = express.Router();
var { upload } = require("../multerSetup");

var { deleteAllSubjects, deleteAllResources } = require("../helper");

var Subject = require("../models/subject");
var Resource = require("../models/resource");

router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  Resource.find({}, (err, foundResources) => {
    if (err) {
      console.log(err);
    } else {
      res.render("resources/index", {
        Resources: foundResources,
      });
    }
  });
});

router.get("/new", (req, res) => {
  res.render("resources/new");
});

router.post("/", upload.single("resourceFile"), async (req, res) => {
  var name = req.body.resourceName;
  var subjectCode = req.body.resourceSubjectCode;
  await Subject.find({ subjectCode: subjectCode }, async (err, subjects) => {
    if (err) {
      console.log(err);
    } else {
      var resource = new Resource({
        name: name,
        subjectCode: subjectCode,
      });

      await resource.save();

      subjects.forEach((subject) => {
        subject.resources.push(resource);
        subject.save();
      });

      res.redirect(`/resource/${resource._id}`);
    }
  });
});

router.get("/:id", (req, res) => {
  Resource.findById(req.params.id, (err, resource) => {
    if (err) {
      console.log(err);
    } else {
      Subject.find({ subjectCode: resource.subjectCode }, (err, subjects) => {
        if (err) {
          console.log(err);
        } else {
          res.render("resources/show", {
            Resource: resource,
            Subjects: subjects,
          });
        }
      });
    }
  });
});

router.get("/:id/edit", (req, res) => {
  Resource.findById(req.params.id, (err, resource) => {
    if (err) {
      console.log(err);
    } else {
      res.render("resources/edit", {
        Resource: resource,
      });
    }
  });
});

router.post("/:id", async (req, res) => {
  var name = req.body.resourceName;
  var subjectCode = req.body.resourceSubjectCode;
  try {
    var resource = await Resource.findById(req.params.id);

    var oldSubject = await Subject.findOne({
      subjectCode: resource.subjectCode,
    });
    var idx = oldSubject.resources.indexOf(resource._id);
    oldSubject.resources.splice(idx, 1);
    oldSubject.save();

    var newSubject = await Subject.findOne({ subjectCode: subjectCode });

    resource.name = name;
    resource.subjectCode = subjectCode;
    await resource.save();

    await newSubject.resources.push(resource);
    await newSubject.save();
    console.log(newSubject);

    res.redirect(`/resource/${resource._id}`);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/delete", (req, res) => {
  Resource.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/resource");
    }
  });
});

module.exports = router;
