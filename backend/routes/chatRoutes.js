const express = require('express');
const { authenticateToken } = require('../middleware/auth.service');
const router = express.Router();
const { accessChat, fetchChats, createGroupChat, renameGroupChat, removeFromGroup, addToGroup} = require('../controllers/chatControllers');

router.route('/').post(authenticateToken, accessChat).get(authenticateToken, fetchChats);

router.route('/creategroup').post(authenticateToken, createGroupChat);

router.route('/renamegroup').put(authenticateToken, renameGroupChat);

router.route('/removegroup').put(authenticateToken, removeFromGroup);

router.route('/addgroup').put(authenticateToken, addToGroup);


module.exports = router;

