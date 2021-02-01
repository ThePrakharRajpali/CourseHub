const mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
    // url          : String,
    name         : String,
    // thumbnail    : String,
    semester     : Number,
    branch       : Number,
    courseNumber : String,
    type         : Number,
});

module.exports = mongoose.model("Resource", resourceSchema);
