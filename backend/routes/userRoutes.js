const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { authUser } = require('../controllers/userController'); 
const { allUsers } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth.service');

router.route('/register').post(registerUser);
router.route('/display').get(authenticateToken, allUsers);
router.post('/login', authUser);

module.exports = router;
