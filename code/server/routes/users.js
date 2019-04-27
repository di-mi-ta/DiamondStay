var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');

import {AuthCtrl} from '../controllers';

router.use(bodyParser.json())

router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, AuthCtrl.getListUser);

router.delete('/', authenticate.verifyUser, AuthCtrl.deleteAllUsers);

router.post('/signup', AuthCtrl.signUp);

router.post('/login', passport.authenticate('local'), AuthCtrl.logIn);

router.get('/logout', AuthCtrl.logOut)

module.exports = router;
