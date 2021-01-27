const mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
    // url          : String,
    name         : String,
    // thumbnail    : String,
    year         : Number,
    semNumber    : Number,
    branch       : Number,
    courseNumber : String,
    type         : Number,
});

module.exports = mongoose.model("Resource", resourceSchema);
