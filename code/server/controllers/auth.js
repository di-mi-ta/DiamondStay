var mongoose = require('mongoose')
const User = mongoose.model('Users');
var authenticate = require('../authenticate');
var passport = require('passport');

const getListUser = (req, res, next) => {
   User.find({})
   .then((users) => {
      res.status(200).json(users);
   })
   .catch((err) => next(err));
};

const deleteAllUsers = (req, res, next) => {
   User.remove({})
   .then((resp) => {
      res.status(200).json(resp);
   })
   .catch((err) => next(err));
};

const signUp = (req, res, next) => {
   User.register(new User({username: req.body.username}),
     req.body.password, (err, user) => {
     if(err) {
      res.status(500).json({ err });
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
           res.status(500).json({ err });
           return ;
         }
         passport.authenticate('local')(req, res, () => {
           res.status(200).json({success: true, status: 'Registration Successful!'});
         });
       });
     }
   });
};

const logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(401).json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});
      }

      var token = authenticate.getToken({_id: req.user._id});
      // Delete sensitive info
      user.salt = undefined;
      user.hash = undefined;

      return res.status(200).json({
        success: true,
        status: 'Login Successful!',
        token: `Bearer ${token}`,
        userInfo: user,
      });
    });
  }) (req, res, next);
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
