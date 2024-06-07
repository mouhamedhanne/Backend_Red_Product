const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authRoutes = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');


router.post('/login', authController.login);
router.post('/register', authController.registerUser);

module.exports = router;