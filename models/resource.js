const mongoose = require("mongoose");

var resourceSchema = new mongoose.Schema({
  // url          : String,
  name: String,
  // thumbnail    : String,
  // semester     : Number,
  // branch       : Number,
  subjectCode: String,
  // type         : Number,
  fileName: String,
});

module.exports = mongoose.model("Resource", resourceSchema);
