const
    express = require('express'),
    auth = require('../authenticate'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll,
    promoRouter = express.Router(),
    Controllers  = require('../controllers'),
    PromoCtrl = Controllers.PromoCtrl;

promoRouter
    .use(bodyParser.json())
    .use(corsAllowAll);

promoRouter.route('/')
    .get(PromoCtrl.getHostPromoOfUser)
    .post(PromoCtrl.createHostPromotion)

promoRouter.route('/:promoId')
    .get(PromoCtrl.getHostPromoById)
    .put(PromoCtrl.updateHostPromotion)
    .delete(PromoCtrl.deleteHostPromotion);

module.exports = promoRouter;
