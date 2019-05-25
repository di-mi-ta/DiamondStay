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
.get(cors.cors, authenticate.verifyAdmin, PromoCtrl.getFullListPromo)
.post(authenticate.verifyUser, authenticate.verifyAdmin, PromoCtrl.createSystemPromotion)

promoRouter.route('/:promoId')
.get(PromoCtrl.getSystemPromoById)
.put(authenticate.verifyUser, authenticate.verifyAdmin, PromoCtrl.updateSystemPromotion)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, PromoCtrl.deleteSystemPromotion);

module.exports = promoRouter;
