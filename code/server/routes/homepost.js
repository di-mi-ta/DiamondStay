const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();
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
    .put(cors.corsWithOptions,HomePostCtrl.updateHomePost)
    .delete(cors.corsWithOptions, HomePostCtrl.deleteHomePost);

module.exports = homePostRouter;
