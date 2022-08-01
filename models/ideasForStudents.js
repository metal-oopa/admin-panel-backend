const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
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
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  numberOfAssignments: {
    type: String,
  },
  numberOfOpenings: {
    type: String,
  },
  locations: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  tags: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  teamSize: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  keyPeople: [
    {
      name: String,
      role: String,
      email: String,
      alternateEmail: String,
      linkedin: String,
    },
  ],
  jobs: [
    {
      title: String,
      jobType: String,
      description: String,
      responsibilities: String,
    },
  ],
});
const CompanyModel = mongoose.model("ideasforstudents", CompanySchema);
module.exports = CompanyModel;
