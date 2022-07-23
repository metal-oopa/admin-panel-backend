require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const StudentModel = require("./models/students");
const DeveloperModel = require("./models/developers");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/hirabledb";

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.json({
    "get list of all companies": "/get-ideas-for-students",
    "get details of a company by id":
      "/get-idea-for-students/?_id=<company_id>",
    "post a new company": "/create-idea-for-students",
    "update company details":
      "/update-student-idea/?_id=<company_id> //PUT method",
    "delete company": "/delete-student-idea/?_id=<company_id> //TODO",
  });
});

// get the list of all ideas
// req.body.name / req.query.name
app.get("/get-ideas-for-students", (req, res) => {
  StudentModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/get-ideas-for-developers", (req, res) => {
  DeveloperModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// get a single idea by using _id
app.get("/get-idea-for-students", (req, res) => {
  try {
    if (req.query._id !== "undefined") {
      StudentModel.findOne({ _id: req.query._id }, (err, data) => {
        if (!err) {
          // console.log(data);
          res.send(data);
        } else {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-idea-for-developers", (req, res) => {
  try {
    if (req.query._id !== "undefined") {
      DeveloperModel.findOne({ _id: req.query._id }, (err, data) => {
        if (!err) {
          // console.log(data);
          res.send(data);
        } else {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// create operations
app.post("/create-idea-for-students", async (req, res) => {
  const ideaForStudent = req.body;
  const newideaForStudent = new StudentModel(ideaForStudent);
  await newideaForStudent.save();

  res.json(newideaForStudent);
});

app.post("/create-idea-for-developers", async (req, res) => {
  const ideaForDeveloper = req.body;
  const newideaForDeveloper = new DeveloperModel(ideaForDeveloper);
  await newideaForDeveloper.save();

  res.json(newideaForDeveloper);
});

// * Update opertions
app.put("/update-student-idea", async (req, res) => {
  const _id = req.query._id;

  try {
    await StudentModel.updateOne(
      { _id: _id },
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        numberOfOpenings: req.body.numberOfOpenings,
        numberOfAssignments: req.body.numberOfAssignments,
        jobs: req.body.jobs,
        locations: req.body.locations,
        tags: req.body.tags,
        teamSize: req.body.teamSize,
        keyPeople: req.body.keyPeople,
      }
    );
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.put("/update-developer-idea", async (req, res) => {
  const _id = req.query._id;

  try {
    await DeveloperModel.updateOne(
      { _id: _id },
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
      }
    );
    res.send("Updated");
  } catch (err) {
    console.log(err);
  }
});

//* Delete operations
app.delete("/delete-student-idea/:id", async (req, res) => {
  const _id = req.params.id;

  await StudentModel.findByIdAndRemove(_id).exec();
  res.send("Deleted");
});

app.delete("/delete-developer-idea/:id", async (req, res) => {
  const _id = req.params.id;

  await DeveloperModel.findByIdAndRemove(_id).exec();
  res.send("Deleted");
});

app.listen(3001, () => {
  console.log("Server is Running! Listening at port 3001!");
});

// function to delete a idea by id
