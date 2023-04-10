let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Survey Model
let Survey = require('../models/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/',(req,res,next)=>{
    Survey.find((err,surveyList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list',{title: 'Active Surveys', SurveyList: surveyList});
        }
    });
});

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',(req,res,next)=>{
    res.render('survey/add',{title: 'Create a New Survey'});
});
/* GET Route for processing the Add page - CREATE Operation */
router.post('/add',(req,res,next)=>{
    let newSurvey = Survey({
        "title":req.body.title,
        "type":req.body.type,
        "responses":req.body.responses,
        "question1":req.body.question1,
        "question2":req.body.question2,
        "question3":req.body.question3,
        "question4":req.body.question4,
        "question5":req.body.question5      
    });
    Survey.create(newSurvey, (err, Survey)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey-list
            res.redirect('/survey-list');
        }
    });
});
/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',(req,res,next)=>{
    let id=req.params.id;

    Survey.findById(id, (err, surveyToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit',{title: 'Edit Survey', survey: surveyToEdit});
        }
    });
});
/* GET Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id',(req,res,next)=>{
    let id = req.params.id
    let updateSurvey = Survey({
        "_id":id,
        "title":req.body.title,
        "type":req.body.type,
        "responses":req.body.responses,
        "question1":req.body.question1,
        "question2":req.body.question2,
        "question3":req.body.question3,
        "question4":req.body.question4,
        "question5":req.body.question5    
    });

    Survey.updateOne({_id: id}, updateSurvey, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/survey-list');
        }
    });
});
/* GET Route to perform Delete - DELETE Operation */
router.get('/delete/:id',(req,res,next)=>{
    let id=req.params.id;

    Survey.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/survey-list');
        }
    });
});

module.exports=router;