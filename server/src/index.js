const express = require("express")
cors = require("cors")

var questionModel = require("../models/Question");
var answerModel = require("../models/Answer");
var categoryModel = require("../models/Category");

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
  questionModel.find({}).
                populate('category').
                populate('choices').
                populate('answer').
                exec(function(err, questions){
                  if (err){
                    console.log(err);
                  }
                  else{
                    res.json(questions);
                  }
                })
})

app.get("/questions/:id", (req, res) => {
  questionModel.find({category : req.params.id}).
                populate('category').
                populate('choices').
                populate('answer').
                exec(function(err, questions){
                  if (err){
                    console.log(err);
                  }
                  else{
                    res.json(questions);
                  }
                })
})

app.post("/add-new-question", (req, res) => {
  var newQuestion = new questionModel({
    question : req.body.question.question
  });

  req.body.question.choices.forEach(choice => {
    var newAnswer = new answerModel({
      value : choice.value,
      question : newQuestion._id
    });

    newAnswer.save(function(err){
      if (err){
        console.log(err);
      }
    });

    newQuestion.choices.push(newAnswer);
  })

  var newCorrectAnswer = newQuestion.choices.filter(x => x.value == req.body.question.answer.value)[0];
  newQuestion.answer = newCorrectAnswer;

  var category = categoryModel.findOne({title : req.body.question.category});
  category.exec(function(err,category){
    if (err){
      console.log(err);
    }
    else{
      category.questions.push(newQuestion);
      category.save();
      newQuestion.category = category;
      newQuestion.save(function(err){
        if (err){
          console.log(err);
        }
      });
    }
  });

  res.sendStatus(200);
})

app.get("/answer/:id", (req, res) => {
  questionModel.findOne({_id : req.params.id}).exec(function(err,answer){
    if (err){
      console.log(err);
    }
    else{
      res.json(answer);
    }
  });
})

app.post("/add-new-category", (req, res) => {
  var newCategory = new categoryModel({
    title : req.body.title
  });
  newCategory.save();
  res.send(newCategory);
})

app.delete("/delete-category", (req, res) => {
  categoryModel.deleteOne({_id : req.body.id}, function(err){
    if (err){
      console.log(err);
    }
  })
  res.sendStatus(200);
})

app.delete("/delete-question", (req, res) => {
  let id = req.body.id;
  questionModel.deleteOne({_id : id}, function(err){
    if (err){
      console.log(err);
    }
  })
  res.sendStatus(200);
})

app.post("/edit-category", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  categoryModel.updateOne({_id : id}, {title : title}, function(err,res){
    if (err){
      console.log(err);
    }
  })
  res.sendStatus(200);
})

app.post("/edit-question", async (req, res) => {
  let id = req.body.id;
  let question= req.body.question;
  let choices = req.body.choices;
  let answer = req.body.answer;
  let category = req.body.category;

  choices.forEach( async (choice) => {
    await answerModel.findOneAndUpdate({_id : choice._id}, {value : choice.value});
  })

  let newAnswer = await answerModel.findOne({_id : answer._id}).exec();

  let newCategory = await categoryModel.findOne({title : category}).exec();

  questionModel.updateOne({_id : id}, {question : question, answer : newAnswer, category : newCategory}, function(err,res){
    if (err){
      console.log(err);
    }
  });
  res.sendStatus(200);
})

app.get("/categories", (req,res) => {
  categoryModel.find({}, function(err, categories){
    if (err){
      console.log(err);
    }
    else{
      res.json(categories);
    }
  });
})

const port = process.env.PORT || 7777
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`)
})
