const mongoose = require('mongoose');

var branchSchema = new mongoose.Schema({
    name: String,
    semester: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
        }
    ],
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        }
    ]
});

module.exports = mongoose.model("Branch", branchSchema);
