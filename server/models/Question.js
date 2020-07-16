var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionModelSchema = new Schema({
    question : String,
    choices: [{
        type: Schema.Types.ObjectId,
        ref: "answers"
    }],
    answer: {
        type: Schema.Types.ObjectId,
        ref: "answers"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
});

module.exports = mongoose.model("questions", questionModelSchema)