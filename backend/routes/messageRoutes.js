const express = require('express');
const { authenticateToken } = require('../middleware/auth.service');
const { sendMessage , getallMessages , deleteMessage} = require('../controllers/messageControllers');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/:receiver_id', authenticateToken, getallMessages);

router.post('/send',authenticateToken, sendMessage );

router.post('/delete',authenticateToken, deleteMessage ); 

module.exports = router;