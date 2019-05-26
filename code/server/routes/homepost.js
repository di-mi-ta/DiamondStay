const
    express = require('express'),
    auth = require('../authenticate'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll,
    Controllers  = require('../controllers'),
    HomePostCtrl = Controllers.HomePostCtrl,
    homePostRouter = express.Router();

homePostRouter
    .use(bodyParser.json())
    .use(corsAllowAll);

homePostRouter.route('/')
    .get(HomePostCtrl.getHomeposts)
    .post(HomePostCtrl.createNewHomePost)
    .delete(HomePostCtrl.deleteAllHomePost);

homePostRouter.route('/:homepostId')
    .get(HomePostCtrl.findHomePostDetailedById)
    .put(HomePostCtrl.updateHomePost)
    .delete(HomePostCtrl.deleteHomePost);

module.exports = homePostRouter;
