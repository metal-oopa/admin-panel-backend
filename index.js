require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CompanyModel = require("./src/models/companies");
const JobModel = require("./src/models/jobs");
const cors = require("cors");
var ImageKit = require("imagekit");
var fs = require("fs");

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb://http://localhost/hirabledb";

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// get imagekit authentication parameters
app.get("/imagekit", (req, res) => {
  const autheticationParameters = imagekit.getAuthenticationParameters();
  res.send(autheticationParameters);
});

app.get("/", (req, res) => {
  res.json({
    "get list of all companies": "/get-companies",
    "get details of a company by id": "/get-company/?_id=<company_id>",
    "post a new company": "/create-company",
    "update company details": "/update-company/?_id=<company_id> //PUT method",
    "delete company": "/delete-company/?_id=<company_id> //DELETE method",
    "get list of all jobs using companyId": "/get-jobs",
    "post a new job": "/create-job",
    "update job details": "/update-job //PUT method",
    "delete job": "/delete-job //DELETE method",
  });
});

// get a single idea by using _id
app.get("/get-company", (req, res) => {
  try {
    if (req.query._id !== undefined) {
      CompanyModel.findOne({ _id: req.query._id }, (err, data) => {
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

// get the list of all ideas
// req.body.name / req.query.name
app.get("/get-companies", (req, res) => {
  CompanyModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// get all jobs
app.get("/get-all-jobs", (req, res) => {
  JobModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// get jobs using the company id
app.get("/get-jobs", (req, res) => {
  const companyId = req.query.companyId;

  try {
    JobModel.find({ companyId: companyId }, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.send(err);
  }
});

// post request to create a new job using company id
app.post("/create-job", (req, res) => {
  const job = req.body;

  try {
    if (req.body.companyId !== undefined) {
      const newJob = new JobModel(job);
      newJob.save((err, data) => {
        if (!err) {
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

// update a job using _id
app.put("/update-job", (req, res) => {
  const _id = req.body._id;

  try {
    JobModel.updateOne({ _id: _id }, req.body, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// delete a job using _id
app.delete("/delete-job", (req, res) => {
  const _id = req.body._id;

  try {
    if (req.body._id !== undefined) {
      JobModel.findOneAndDelete({ _id: _id }, (err, data) => {
        if (!err) {
          res.send(data);
        } else {
          res.send(err);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
});

// create operations
app.post("/create-company", async (req, res) => {
  const ideaForCompany = req.body;
  const newideaForCompany = new CompanyModel(ideaForCompany);
  await newideaForCompany.save();

  res.status(201).json(newideaForCompany);
});

// * Update opertions
app.put("/update-company", async (req, res) => {
  const _id = req.query._id;

  try {
    const response = await CompanyModel.updateOne({ _id: _id }, req.body);
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//* Delete operations
app.delete("/delete-company/:id", async (req, res) => {
  const _id = req.params.id;

  await CompanyModel.findByIdAndRemove(_id).exec();
  res.send("Deleted");
});

app.listen(3001, () => {
  console.log("Server is Running! Listening at port 3001!");
});

// function to delete a idea by id
