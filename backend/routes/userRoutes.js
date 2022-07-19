const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { authUser } = require('../controllers/userController'); 
const { contacts } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth.service');
const { logout } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.post('/login', authUser);
router.route('/contacts/:id').get(authenticateToken, contacts);
router.post('/logout', logout)

module.exports = router;
