let mongoose = require('mongoose');

//create a model class
let surveyModel= mongoose.Schema({
    title: String,
    type: String,
    responses: Number,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);