const express = require('express')
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
const authenticate = require('../authenticate');
const cors = require('./cors');

const Controllers  = require('../controllers');
const PromoCtrl = Controllers.PromoCtrl;

promoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, PromoCtrl.getFullListPromo)
    .post(cors.corsWithOptions, PromoCtrl.createSystemPromotion)

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, PromoCtrl.getSystemPromoById)
    .put(cors.corsWithOptions, PromoCtrl.updateSystemPromotion)
    .delete(cors.corsWithOptions, PromoCtrl.deleteSystemPromotion);

module.exports = promoRouter;
