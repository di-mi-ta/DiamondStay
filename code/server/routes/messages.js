// TODO 
const
    express = require('express'),
    auth = require('../authenticate'),
    corsAllowAll = require('./cors').allowAll,
    controller = require('../controllers/messages');
    
const router = express.Router();

router.use(corsAllowAll)
router.use(auth.verifyUser);

router
    .route('/')
    .get(controller.getUserInboxMessages)
    .post(controller.addMessage)
    .delete(controller.deleteMessage)
module.exports = router;