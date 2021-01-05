const mongoose = require('mongoose');

var semesterSchema = new mongoose.Schema({
    name: String,
    num: Number,
    // subjects: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Subject",
    //     }
    // ],
    // branch: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:  "Branch",
    //     }
    // ]
});

module.exports = mongoose.model("Semester", semesterSchema);
