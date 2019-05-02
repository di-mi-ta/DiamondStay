var mongoose = require('mongoose')
const User = mongoose.model('Users');
var authenticate = require('../authenticate');

const getListUser = (req, res, next) => {
   User.find({})
   .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
   })
   .catch((err) => next(err)); 
};

const deleteAllUsers = (req, res, next) => {
   User.remove({})
   .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
   })
   .catch((err) => next(err)); 
};

const signUp = (req, res, next) => {
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
};

const logIn = (req, res) => {
   var token = authenticate.getToken({_id: req.user._id});
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json({success: true, token: token, status: 'You are successfully logged in!'});
};

const logOut = (req,res,next) => {
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
}

module.exports = {
  logOut,
  logIn,
  signUp,
  deleteAllUsers,
  getListUser
}

