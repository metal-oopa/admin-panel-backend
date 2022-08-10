const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  tagline: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  numberOfOpenings: {
    type: String,
    default: "",
  },
  totalFunding: {
    type: String,
    default: "",
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
  teamSize: {
    type: String,
    default: "",
  },
  keyPeople: [
    {
      name: {
        type: String,
        default: "",
      },
      role: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      alternateEmail: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
    },
  ],
  jobs: [
    {
      title: String,
      jobType: String,
      description: String,
    },
  ],
});
const CompanyModel = mongoose.model("companies", CompanySchema);
module.exports = CompanyModel;
