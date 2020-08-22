var questionModel = require("../models/Question");
var answerModel = require("../models/Answer");
var categoryModel = require("../models/Category");

getQuestions = (req, res) => {
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
}

getQuestion = (req, res) => {
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
}

addNewQuestion = (req, res) => {
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
}

deleteQuestion = (req, res) => {
    let id = req.body.id;
    questionModel.deleteOne({_id : id}, function(err){
        if (err){
        console.log(err);
        }
    })
    res.sendStatus(200);
}

editQuestion = async (req, res) => {
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
}

module.exports = {getQuestions, getQuestion, addNewQuestion, deleteQuestion, editQuestion};