var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerModelSchema = new Schema({
    value : String,
    question: {
        type: Schema.Types.ObjectId,
        ref: "questions"
    }
});

module.exports = mongoose.model("answers", answerModelSchema);