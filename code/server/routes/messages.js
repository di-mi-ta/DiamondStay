// TODO 
const
    express = require('express'),
    auth = require('../authenticate'),
    corsAllowAll = require('./cors').allowAll,
    controller = require('../controllers/messages');
    
const router = express.Router();

router
    .use(corsAllowAll)
    .use(auth.verifyUser);

router
    .route('/')
    .get(controller.getUserInboxMessages)
    .post(controller.addMessage);
    
router.put('/:id', controller.seenMessage);
router.delete('/:id', controller.deleteMessage);

module.exports = router;
