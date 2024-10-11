const authService = require('../services/authService');
const jwtUtils = require('../utils/jtw.utils');

exports.signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        const token = jwtUtils.generateToken(user);
        res.status(201).json({ message: 'User registered successfully', token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        const token = jwtUtils.generateToken(user);
        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.googleLoginCallback = async (req, res) => {
    try {
        const user = req.user;
        const token = jwtUtils.generateToken(user);
        res.redirect(`/?token=${token}`); // Redirect to frontend with the JWT token
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        // Logic for logging out user (e.g., invalidating token, etc.)
        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
