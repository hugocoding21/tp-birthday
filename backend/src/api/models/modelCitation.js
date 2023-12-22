const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let citationSchema = new Schema({
  citation: {
    type: String,
  },
  auteur: {
    type: String,
  },
});

module.exports = mongoose.model("quotes", citationSchema);
