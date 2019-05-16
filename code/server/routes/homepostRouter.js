const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

homePostRouter.use(bodyParser.json());

const Controllers  = require('../controllers');
const HomePostCtrl = Controllers.HomePostCtrl;
const PromoCtrl = Controllers.PromoCtrl;

homePostRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, HomePostCtrl.getListWaitingConfirmedHomePosts)
.post(cors.corsWithOptions, authenticate.verifyUser, HomePostCtrl.createNewHomePost)
.delete(cors.corsWithOptions, authenticate.verifyUser, HomePostCtrl.deleteAllHomePost);

homePostRouter.route('/:homePostId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, HomePostCtrl.findHomePostDetailedById)
.post(cors.corsWithOptions, authenticate.verifyUser, HomePostCtrl.postRating)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.updateHomePost)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.deleteHomePost);

homePostRouter.route('/:homePostId/rating/:ratingId')
.get(HomePostCtrl.getLstRatingsOfHomePost)
.put(authenticate.verifyUser, HomePostCtrl.editRating)
.delete(authenticate.verifyUser, HomePostCtrl.deleteRating);

module.exports = homePostRouter;
