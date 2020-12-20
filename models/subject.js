const mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    subjectCode: String, //code eg. CS221
    name: String, //official name eg. Digital design

    // resources: [
    //     {
    //
    //     }
    // ]
    resources: [
        {
            type: String,
        }
    ],
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
    },
});

module.exports = mongoose.model("Subject", subjectSchema);
