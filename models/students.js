const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureLink: {
    type: String,
  },
  website: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  lineId: {
    type: String,
  },
  wechatId: {
    type: String,
  },
  passionProjectLink: {
    type: String,
  },
  github: {
    type: String,
  },
  timezone: {
    type: String,
  },
  college: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
  degree: {
    type: String,
  },
  major: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  alternateEmail: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  alternateMobile: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  locations: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  roles: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  areasOfExperience: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  skills: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  collaborationPreferences: [
    {
      name: String,
      selected: Boolean,
    },
  ],
  workExperience: [
    {
      companyName: String,
      companyWebsite: String,
      title: String,
      location: String,
      workedRemotely: Boolean,
      currentlyWorking: Boolean,
      description: String,
      fromMonth: String,
      fromYear: String,
      toMonth: String,
      toYear: String,
    },
  ],
  volunteerExperiences: [
    {
      organizationName: String,
      role: String,
      fromDate: Date,
      toDate: Date,
      currentlyWorking: Boolean,
      description: String,
    },
  ],
  achievements: [
    {
      organizationName: String,
      title: String,
      dateReceived: Date,
      description: String,
    },
  ],
  hackathonExperiences: [
    {
      name: String,
      role: String,
      dateParticipated: Date,
      description: String,
    },
  ],
  societies: [
    {
      name: String,
      role: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  clubs: [
    {
      name: String,
      role: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  competitions: [
    {
      name: String,
      dateParticipated: Date,
      isWinner: Boolean,
      isRunnerUp: Boolean,
      isParticipant: Boolean,
    },
  ],
  documents: [],
});

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
