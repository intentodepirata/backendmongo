const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: String,
  name: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
