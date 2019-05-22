const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

homePostRouter.use(bodyParser.json());

const Controllers  = require('../controllers');
const HomePostCtrl = Controllers.HomePostCtrl;

homePostRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, HomePostCtrl.getHomeposts)
    .post(cors.corsWithOptions, HomePostCtrl.createNewHomePost)
    .delete(cors.corsWithOptions, HomePostCtrl.deleteAllHomePost);

homePostRouter.route('/:homePostId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, HomePostCtrl.findHomePostDetailedById)
    .post(cors.corsWithOptions, HomePostCtrl.postRating)
    .put(cors.corsWithOptions,HomePostCtrl.updateHomePost)
    .delete(cors.corsWithOptions, HomePostCtrl.deleteHomePost);

homePostRouter.route('/:homePostId/rating/:ratingId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, HomePostCtrl.editRating)
    .delete(cors.corsWithOptions, HomePostCtrl.deleteRating);

module.exports = homePostRouter;
