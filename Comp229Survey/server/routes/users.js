
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('./../config/db');

// create the User Model instance
let userModel = require('./../models/user');
let User = userModel.User; // alias

//let Survey = require('../models/survey');

/* GET the login page */
router.get('/', function(req, res, next) {

      if(!req.user)
    {
       
  res.render('auth/login', { title: 'Log in',
  messages: req.flash('loginMessage')});
    }
        else
    {
  res.render('home', { title: 'Home', displayName:req.user?req.user.displayName:''});
    }
 
});

/* 2ND GET the login page */
router.get('/login', function(req, res, next) {
      if(!req.user)
    {
       
  res.render('auth/login', { title: 'Log in',
  messages: req.flash('loginMessage')});
    }
          else
    {
  res.render('home', { title: 'Home',displayName:req.user?req.user.displayName:''});
    }
 
 
});

/* POST the login page */
router.post('/', passport.authenticate('local', { failureRedirect: '/users/', failureMessage: true }),
  function(req, res) {
    const payload = 
    {
        id: User._id,
        displayName: User.displayName,
        username: User.username,
        email: User.email
    }

    const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800 // 1 week
    });

   
    //return res.redirect('/surveylist');
    res.render('home', {title: 'Home', displayName:req.user?req.user.displayName:''});
  });

/*function(req, res, next) {
  
  passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
          res.render('home', { title: 'Home'}); // next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            res.redirect('/user/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
              res.render('home', { title: 'Home'});// next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

           
            return res.redirect('/surveylist');
        });
    }
  )

});
*/

/*passport.authenticate('local', { failureRedirect: '/users/', failureMessage: true }),
  function(req, res) {
    res.render('home', {title: 'Home', displayName:req.user?req.user.displayName:''});
  });
*/
/*function(req, res, next) {

  res.redirect('/survey-list'); // this is what i was using to test is the post was working

  /*
  passport.authenticate('local', (err, user, info));

    if(err)
  { res.redirect('/survey-list')}

          if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/user/login');
        }


});

/* GET logout page */

router.get('/logout', function(req, res, next) {

  if (req.user)
  {
    req.logout();
  }

  res.redirect('/survey-list');
  //req.logout();
      res.redirect('/survey-list');
    //res.render('home', { title: 'Home',displayName:req.user?req.user.displayName:''});
//res.render('home', {title: 'Home', displayName:req.user?req.user.displayName:''});
 
});

router.post('/logout', function(req, res, next) {

  //req.logout();
      res.redirect('/survey-list');
    //res.render('home', { title: 'Home',displayName:req.user?req.user.displayName:''});
//res.render('home', {title: 'Home', displayName:req.user?req.user.displayName:''});
 
});

/* GET register page*/

router.get('/register', function(req, res, next) {

  res.render('auth/register', { title: 'Register',
  messages: req.flash('registerMessage')});
 
});


/* POST registration page */

router.post('/register', function(req, res, next) {
      
    // instantiate a user object
    let newUser = new User({
        "username": req.body.username,
        //"password": req.body.password,
        "email": req.body.email,
        "displayName": req.body.displayName
    });

      
User.register(newUser, req.body.password, (err) => {
  if(err)
  {
      //console.log("Error: Inserting New User");
      //res.render('auth/register', { title: 'Log in'});

      console.log("Error: Inserting New User");
      if(err.name == "UserExistsError")
      {
          req.flash(
              'registerMessage',
              'Registration Error: User Already Exists!'
          );
          console.log('Error: User Already Exists!')
      }
      res.render('auth/register', {title: 'Register',
      messages: req.flash('registerMessage')})
      
  }
  else
  {
    res.redirect('/survey-list');
  }
});
  //res.render('home', { title: 'home'});
});

module.exports = router;
