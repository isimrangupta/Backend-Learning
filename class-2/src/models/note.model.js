const mongoose = require("mongoose");

/* title & content */


//Schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});


// Model
const noteModel = mongoose.model("note", noteSchema)


module.exports = noteModel