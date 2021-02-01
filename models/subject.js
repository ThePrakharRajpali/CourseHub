const mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name            : String, //official name eg. Digital design
    branch          : String,
    semester        : String,
    semsterNumber   : Number,
    subjectCode     : String, //code eg. CS221
    resources       : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],
});

module.exports = mongoose.model("Subject", subjectSchema);
