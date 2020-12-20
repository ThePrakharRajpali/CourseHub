const mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: String,
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
