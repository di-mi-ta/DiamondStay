// TODO 
const
    express = require('express'),
    auth = require('../authenticate'),
    controller = require('../controllers/messages');
    
const router = express.Router();

router.use(auth.verifyUser);

router
    .route('/')
    .get(controller.getUserInboxMessages)
    .post(controller.addMessage)
    .delete(controller.deleteMessage)
module.exports = router;