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
    .get(cors.cors, PromoCtrl.getHostPromoOfUser)
    .post(cors.corsWithOptions, PromoCtrl.createHostPromotion)

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, PromoCtrl.getHostPromoById)
    .put(cors.corsWithOptions, PromoCtrl.updateHostPromotion)
    .delete(cors.corsWithOptions, PromoCtrl.deleteHostPromotion);

module.exports = promoRouter;
