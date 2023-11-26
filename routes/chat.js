const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const chatController = require('../controllers/chat');

router.post('/chatmessage',auth.authenticate,chatController.postchat);

router.get('/get-chat',auth.authenticate,chatController.getchat);

module.exports = router;

