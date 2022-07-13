const express = require('express');
const { authenticateToken } = require('../middleware/auth.service');
const { sendMessage , allMessages} = require('../controllers/messageControllers');
const router = express.Router();

router.route('/').post(authenticateToken, sendMessage);
router.route('/:chatId').get(authenticateToken, allMessages);

module.exports = router;