const mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    subjectCode: String, //code eg. CS221
    name: String, //official name eg. Digital design
    branch: String,
    semester: String,
    semsterNum: Number,
    resources: [
        {
            type: String,
        }
    ],
});

module.exports = mongoose.model("Subject", subjectSchema);
