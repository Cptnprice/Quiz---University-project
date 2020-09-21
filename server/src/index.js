const express = require("express")
cors = require("cors")

var answerController = require("../Controllers/AnswerController");
var categoryController = require("../Controllers/CategoryController");
var questionController = require("../Controllers/QuestionController");

let getAnswer = answerController.getAnswer;

let getCategories = categoryController.getCategories;
let addNewCategory = categoryController.addNewCategory;
let deleteCategory = categoryController.deleteCategory;
let editCategory = categoryController.editCategory;

let getQuestions = questionController.getQuestions;
let getQuestion = questionController.getQuestion;
let addNewQuestion = questionController.addNewQuestion;
let deleteQuestion = questionController.deleteQuestion;
let editQuestion = questionController.editQuestion;

var mongoose = require('mongoose');

var mongoDB = "mongodb://127.0.0.1/TestDatabase9";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.get("/questions", (req, res) => {
  getQuestions(req, res);
})

app.get("/questions/:id", (req, res) => {
  getQuestion(req, res);
})

app.post("/add-new-question", (req, res) => {
  addNewQuestion(req, res);
})

app.get("/answer/:id", (req, res) => {
  getAnswer(req, res);
})

app.post("/add-new-category", (req, res) => {
  addNewCategory(req, res);
})

app.delete("/delete-category", (req, res) => {
  deleteCategory(req, res);
})

app.delete("/delete-question", (req, res) => {
  deleteQuestion(req, res);
})

app.post("/edit-category", (req, res) => {
  editCategory(req, res);
})

app.post("/edit-question", async (req, res) => {
  editQuestion(req, res);
})

app.get("/categories", (req,res) => {
  getCategories(req, res);
})

const port = process.env.PORT || 7777
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`)
})
