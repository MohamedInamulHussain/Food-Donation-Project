const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    quantity: { type: Number, required: true },
    cookedTime: { type: String, required: true },
    pickupDate: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    userId: { type: String, required: true,default:"null"},
    volunteerId: { type: String, required: true,default: "null" },
    foodStatus: { type: String, enum: ['Pending', 'Picked Up', 'Delivered'], default: 'Pending' }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
