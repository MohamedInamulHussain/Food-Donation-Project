const Donation = require('../models/DonationModel');
const Donator = require('../models/DonatorLoginModel');
const Volunteer = require('../models/VolunteerLoginModel');
const FoodRequest = require('../models/FoodRequestModel'); 
// **User Signup**
exports.signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields', msg_type: 'error' });
        }

        // Check if user already exists
        const existingUser = await Donator.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            if (existingUser.userName === userName) {
                return res.status(400).json({ msg: 'Username already exists!', msg_type: 'error' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ msg: 'Email already exists!', msg_type: 'error' });
            }
        }

        // Save user (WITHOUT encryption)
        const newUser = new Donator({
            userName,
            email,
            password,  // Storing password as it is (no encryption)
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registration successful', msg_type: 'success' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
    }
};

// **User Login**
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter your email and password', msg_type: 'error' });
        }

        const user = await Donator.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'User does not exist!', msg_type: 'error' });
        }

        // Check if password matches (NO encryption)
        if (password !== user.password) {
            return res.status(401).json({ msg: 'Incorrect password!', msg_type: 'error' });
        }

        res.status(200).json({ msg: 'Login successful', msg_type: 'success', userName: user.userName });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
    }
};
//volunteer signup
// **User Signup**
exports.volunteerSignup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields', msg_type: 'error' });
        }

        // Check if user already exists
        const existingUser = await Volunteer.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            if (existingUser.userName === userName) {
                return res.status(400).json({ msg: 'Username already exists!', msg_type: 'error' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ msg: 'Email already exists!', msg_type: 'error' });
            }
        }

        // Save user (WITHOUT encryption)
        const newUser = new Volunteer({
            userName,
            email,
            password,  // Storing password as it is (no encryption)
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registration successful', msg_type: 'success' });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
    }
};
//volunteerLogin
exports.volunteerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter your email and password', msg_type: 'error' });
        }

        const user = await Volunteer.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'User does not exist!', msg_type: 'error' });
        }

        // Check if password matches (NO encryption)
        if (password !== user.password) {
            return res.status(401).json({ msg: 'Incorrect password!', msg_type: 'error' });
        }

        res.status(200).json({ msg: 'Login successful', msg_type: 'success', userName: user.userName });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
    }
};

// **Save Donation Details**
exports.saveDonationDetails = async (req, res) => {
    try {
        const {
            foodName, quantity, cookedTime, pickupDate, location,
            latitude, longitude, userId, volunteerId, foodStatus
        } = req.body;

        // Validate required fields
        if (!foodName || !quantity || !pickupDate || !location || !latitude || !longitude || !userId) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        const donation = new Donation({
            foodName,
            quantity,
            cookedTime: cookedTime ? new Date(cookedTime) : null,
            pickupDate: new Date(pickupDate),
            location,
            latitude,
            longitude,
            userId,
            volunteerId: volunteerId || null,
            foodStatus: foodStatus || 'Pending'
        });

        await donation.save();
        res.status(201).json({ message: 'Donation details saved successfully!' });
    } catch (error) {
        console.error('Error saving donation details:', error);
        res.status(500).json({ error: 'Failed to save donation details.' });
    }
};

// **Display Volunteer Donations**
exports.displayVolunteer = async (req, res) => {
    try {
        const donationData = await Donation.find({});
        res.status(200).json(donationData);
    } catch (error) {
        console.error('Error fetching donation details:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { volunteerId, foodStatus } = req.body;

    try {
        const updatedDonation = await Donation.findByIdAndUpdate(id, 
            { volunteerId, foodStatus }, 
            { new: true }
        );

        if (!updatedDonation) {
            return res.status(404).json({ msg: 'Donation not found', msg_type: 'error' });
        }

        res.status(200).json({ msg: 'Donation accepted successfully', msg_type: 'success', updatedDonation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', msg_type: 'error' });
    }
};
exports.displayFilteredFood= async (req, res) =>{
        const email=req.params.email;
        try {
            const donationData = await Donation.find({
                volunteerId: email, 
                foodStatus: 'Accepted'
            });
            res.status(200).json(donationData);
        } catch (error) {
            console.error('Error fetching donation details:', error);
            res.status(500).json({ msg: 'Internal server error' });
        }
};

// Handle Food Request Submission
// **Handle Food Request Submission**
exports.foodRequest = async (req, res) => {
    try {
        const { name, contactNumber, location, quantity } = req.body;

        // Validate required fields
        if (!name || !contactNumber || !location || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new food request entry
        const newRequest = new FoodRequest({
            name,
            contactNumber,
            location,
            quantity,
        });

        // Save to database
        await newRequest.save();

        res.status(201).json({ message: 'Food request submitted successfully' });

    } catch (error) {
        console.error('Error saving food request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFoodRequests = async (req, res) => {
    try {
        const foodRequests = await FoodRequest.find().sort({ createdAt: -1 });
        res.status(200).json(foodRequests);
    } catch (error) {
        console.error('Error fetching food requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
