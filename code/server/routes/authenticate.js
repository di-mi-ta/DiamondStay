const express = require('express');
const router = express.Router();
const auth = require('../authenticate');

/* GET home page. */
router.all('*', auth.verifyUser);

module.exports = router;