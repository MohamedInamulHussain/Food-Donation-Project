const express = require('express');
const router = express.Router();
const donationControllers = require('../controllers/users');


//login part
router.post('/signup', donationControllers.signup);
router.post('/login', donationControllers.login);
//for volunteer
router.post('/volunteer-signup', donationControllers.volunteerSignup);
router.post('/volunteer-login', donationControllers.volunteerLogin);
// Route for adding a donation
router.post('/adddonation', donationControllers.saveDonationDetails);

// Route for displaying volunteer data
router.get('/Volunteer', donationControllers.displayVolunteer);
router.put('/update-donation/:id', donationControllers.updateVolunteer);
router.get('/filtered-Food/:email',donationControllers.displayFilteredFood);

//food request
router.post('/food-request', donationControllers.foodRequest);
router.get('/food-requests', donationControllers.getFoodRequests);

module.exports = router;
