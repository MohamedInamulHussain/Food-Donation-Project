const mongoose = require('mongoose');

const volunteerLoginSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter a Username"],
        trim: true,
        maxLength: [100, "Username exceeds the maximum length of 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        trim: true,
        maxLength: [100, "Email exceeds the maximum length of 100 characters"]
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"],
        trim: true,
        maxLength: [100, "Password exceeds the maximum length of 100 characters"]
    }
});

const VolunteerUser = mongoose.model('VolunteerUser', volunteerLoginSchema);
module.exports = VolunteerUser;
