const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  spotify_id: {
    type: String,
    required: true,
    unique: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;