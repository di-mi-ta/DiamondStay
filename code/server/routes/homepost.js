const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();
const authenticate = require('../authenticate');

homePostRouter.use(bodyParser.json());

const Controllers  = require('../controllers');
const HomePostCtrl = Controllers.HomePostCtrl;
const PromoCtrl = Controllers.PromoCtrl;

homePostRouter.route('/')
.get(HomePostCtrl.getListWaitingConfirmedHomePosts)
.post(authenticate.verifyUser, HomePostCtrl.createNewHomePost)
.delete(authenticate.verifyUser, HomePostCtrl.deleteAllHomePost);

homePostRouter.route('/:homePostId')
.get(HomePostCtrl.findHomePostDetailedById)
.post(authenticate.verifyUser, HomePostCtrl.postRating)
.put(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.updateHomePost)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, HomePostCtrl.deleteHomePost);

//for promotions
// homePostRouter.route('/:homePostId/promotions')
// .get(PromoCtrl.getActivePromoForHomepost)

homePostRouter.route('/:homePostId/rating/:ratingId')
.get(HomePostCtrl.getLstRatingsOfHomePost)
.put(authenticate.verifyUser, HomePostCtrl.editRating)
.delete(authenticate.verifyUser, HomePostCtrl.deleteRating);

module.exports = homePostRouter;