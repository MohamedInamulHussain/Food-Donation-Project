const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const donationController = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/authMiddleware');

// User authentication routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes
router.post('/donate', authMiddleware, donationController.saveDonationDetails);
router.get('/volunteers', authMiddleware, donationController.displayVolunteer);

module.exports = router;
