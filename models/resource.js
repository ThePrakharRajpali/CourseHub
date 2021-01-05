const mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
    url       : String,
    name      : String,
    thumbnail : String // if any
});

module.exports = mongoose.model("Resource", resourceSchema);
