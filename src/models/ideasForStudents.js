const mongoose = require("mongoose");

const IdeasForStudentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});
const IdeasForStudentModel = mongoose.model(
  "ideas_for_students",
  IdeasForStudentSchema
);
module.exports = IdeasForStudentModel;
