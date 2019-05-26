var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
const cors = require('./cors');
var passport = require('passport');

const Controllers  = require('../controllers');
const AuthCtrl = Controllers.AuthCtrl;

router.options('*', cors.corsWithOptions,(req, res) => {res.sendStatus(200);})

router
  .get('/',  AuthCtrl.getListUser)
  .delete('/', authenticate.verifyUser, AuthCtrl.deleteAllUsers)
  .post('/signup', cors.allowAll, AuthCtrl.signUp);

router
  .post('/login', cors.allowAll, AuthCtrl.logIn);

router
  .get('/checkJWTtoken', cors.allowAll, (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
      if (err)
        return next(err);

      if (!user) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        return res.json({status: 'JWT invalid!', success: false, err: info});
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({status: 'JWT valid!', success: true, user: user});

      }
    }) (req, res);
});


router.get('/logout', AuthCtrl.logOut)

module.exports = router;
