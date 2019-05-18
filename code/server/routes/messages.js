// TODO 
const express = require('express');
const auth = require('../authenticate');
const controller = require('../controllers/message')

const router = express.Router();
router.route('/api/messages/').
    get(auth.verifyUser)