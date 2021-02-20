const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
 currentsem: {
     type : Int32,
     required : true// will have to calculate using user.joinyear
 },
  date: {
    type: Date,
    default: Date.now
  }//just the current date
});

module.exports = mongoose.model('profile', ProfileSchema);