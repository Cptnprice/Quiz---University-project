var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categoryModelSchema = new Schema({
    title : String,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "questions"
    }]
});

module.exports = mongoose.model("categories", categoryModelSchema);