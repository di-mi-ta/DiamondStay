const
    express = require('express'),
    auth = require('../authenticate'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll,
    Controllers  = require('../controllers'),
    LocationCtrl = Controllers.LocationCtrl,
    locationRouter = express.Router();

locationRouter
  .use(bodyParser.json())
  .use(corsAllowAll);

locationRouter.route('/')
    .get(LocationCtrl.getLocations)
    .delete(LocationCtrl.deleteAll)

module.exports = locationRouter;
