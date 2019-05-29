const
    router = require('express').Router(),
    corsAllowAll = require('./cors').allowAll,
    controller = require('../controllers/homepostSearch');
    bodyParser = require('body-parser'),

router
    .use(corsAllowAll)
    .use(bodyParser.json())
router.get('/', controller.search);

module.exports = router;
