var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json())

router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   User.find({})
   .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
   })
   .catch((err) => next(err)); 
});

router.delete('/', authenticate.verifyUser, (req, res, next) => {
  User.remove({})
  .then((resp) => {
     res.statusCode = 200;
     res.setHeader('Content-Type','application/json');
     res.json(resp);
  })
  .catch((err) => next(err)); 
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstName)
        user.firstName = req.body.firstName;
      if (req.body.lastName)
        user.lastName = req.body.lastName;
      if (req.body.email) 
        user.email = req.body.email;
      if (req.body.phone)
        user.phone = req.body.phone;
      if (req.body.typeUser)
        user.typeUser = req.body.typeUser;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout',function(req,res,next){
  if (req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
