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
    .post(controller.addMessage)
    .put(controller.seenMessage)
    
router.delete('/:messageId', controller.deleteMessage);

module.exports = router;
