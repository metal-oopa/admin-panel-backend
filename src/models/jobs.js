// jobtitle, internship/fulltime, desc, featured
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobtitle: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  companyId: {
    type: String,
    default: "",
  },
});

const JobsModel = mongoose.model("jobs", JobSchema);
module.exports = JobsModel;
