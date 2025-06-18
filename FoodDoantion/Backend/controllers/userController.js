// const User = require('../models/userModel'); 
// const Passenger = require('../models/passengerModel'); 
// const bcrypt = require('bcrypt');

// exports.register = async (req, res) => {
//     try {
//         const { userName, email, password, confirmPassword } = req.body;

//         if (password !== confirmPassword) {
//             return res.status(400).json({ msg: 'Passwords do not match', msg_type: 'error' });
//         }

//         const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

//         if (existingUser) {
//             if (existingUser.userName === userName) {
//                 return res.status(400).json({ msg: 'Username already exists!', msg_type: 'error' });
//             } else if (existingUser.email === email) {
//                 return res.status(400).json({ msg: 'Email already exists!', msg_type: 'error' });
//             }
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             userName,
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         return res.status(201).json({ msg: 'User registration successful', msg_type: 'success' });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { userName, password } = req.body;
        
//         if (!userName || !password) {
//             return res.status(400).json({ msg: 'Please enter your username and password', msg_type: 'error' });
//         }

//         const user = await User.findOne({ userName });

//         if (!user) {
//             return res.status(401).json({ msg: 'User does not exist!', msg_type: 'error' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ msg: 'Incorrect password!', msg_type: 'error' });
//         }

//         return res.status(200).json({ msg: 'Login successful', msg_type: 'success', userName: user.userName });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: 'Internal server error', msg_type: 'error' });
//     }
// };