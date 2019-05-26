const
    express = require('express'),
    auth = require('../authenticate'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll;
    Controllers  = require('../controllers'),
    PromoCtrl = Controllers.PromoCtrl;
    promoRouter = express.Router();

promoRouter
    .use(bodyParser.json())
    .use(corsAllowAll);

promoRouter.route('/')
    .get(PromoCtrl.getFullListPromo)
    .post(PromoCtrl.createSystemPromotion)

promoRouter.route('/:promoId')
    .get(PromoCtrl.getSystemPromoById)
    .put(PromoCtrl.updateSystemPromotion)
    .delete(PromoCtrl.deleteSystemPromotion);

module.exports = promoRouter;
