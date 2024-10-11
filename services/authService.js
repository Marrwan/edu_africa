const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Signup service
exports.signup = async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return await newUser.save();
};

// Login service
exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};
