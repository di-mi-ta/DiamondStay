const
    router = require('express').Router(),
    corsAllowAll = require('./cors').allowAll,
    controller = require('../controllers/homepostSearch');

router.use(corsAllowAll)
router.get('/', controller.search);

module.exports = router;
