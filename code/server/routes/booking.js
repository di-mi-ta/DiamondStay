const
    router = require('express').Router(),
    auth = require('../authenticate'),
    corsAllowAll = require('./cors').allowAll,
    controller = require('../controllers/booking');
    
router
    .use(corsAllowAll)
    .use(auth.verifyUser);

router.get('/all', controller.getAllBookings);
router.get('/for-host',controller.getBookingsOfHost);
router.get('/:id', controller.getBooking);
router.post('/', controller.addBooking);

module.exports = router;
