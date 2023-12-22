const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
});

module.exports = mongoose.model("users", userSchema);
