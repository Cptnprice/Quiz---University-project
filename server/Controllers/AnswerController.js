var answerModel = require("../models/Answer");
var questionModel = require("../models/Question");

getAnswer = (req, res) => {
    questionModel.findOne({_id : req.params.id}).exec(function(err,answer){
        if (err){
          console.log(err);
        }
        else{
          res.json(answer);
        }
      });
}

module.exports = {getAnswer};