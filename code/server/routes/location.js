const express = require('express')
const bodyParser = require('body-parser');

const locationRouter = express.Router();
locationRouter.use(bodyParser.json());
const cors = require('./cors');

const Controllers  = require('../controllers');
const LocationCtrl = Controllers.LocationCtrl;

locationRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, LocationCtrl.getLocations)
    .delete(cors.corsWithOptions, LocationCtrl.deleteAll)

module.exports = locationRouter;
