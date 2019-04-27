const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();

const HomePosts = require('../models/homeposts');
const authenticate = require('../authenticate');

homePostRouter.use(bodyParser.json());

import {HomePostCtrl} from '../controllers'

homePostRouter.route('/')
.get(HomePostCtrl.getListHomePostsVerifyOK)
.post(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.createNewHomePost)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.deleteAllHomePost);

homePostRouter.route('/:homePostId')
.get(HomePostCtrl.findHomePostById)
.put(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.updateHomePost)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.deleteHomePost);

homePostRouter.route('/:homePostId/rating/:ratingId')
.get(HomePostCtrl.getListRatingOfHomePost)
.put(authenticate.verifyUser, HomePostCtrl.editRating)
.delete(authenticate.verifyUser, HomePostCtrl.deleteRating);

module.exports = homePostRouter;