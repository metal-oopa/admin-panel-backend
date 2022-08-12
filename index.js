require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CompanyModel = require("./src/models/companies");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hirable-frontend.herokuapp.com/",
      "https://admin-panel-beta-six.vercel.app/",
    ],
    credentials: false,
  })
);

const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb://http://localhost/hirabledb";

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.json({
    "get list of all companies": "/get-companies",
    "get details of a company by id": "/get-company/?_id=<company_id>",
    "post a new company": "/create-company",
    "update company details": "/update-company/?_id=<company_id> //PUT method",
    "delete company": "/delete-company/?_id=<company_id> //DELETE method",
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
      console.log("OK");
      res.json(result);
    }
  });
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
  const updatedDetails = req.body;

  try {
    const response = await CompanyModel.updateOne({ _id: _id }, updatedDetails);
    res.send(updatedDetails);
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
